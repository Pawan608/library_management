from django.http import JsonResponse,HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.utils import IntegrityError
from django.db.models import F
import json
from .models import Book,Member,Transaction
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pprint
from datetime import datetime
from django.forms.models import model_to_dict
from django.utils import timezone
from datetime import datetime
from django.db import transaction
@api_view(['POST'])
def creatTransaction(request,isbn,memberID):
    try:
        # TODO make the debt validation
        # print("new print running",isbn,memberID)
        book=Book.objects.get(isbn=isbn)
        member=Member.objects.filter(memberID=memberID)
        # print("membersss",member)
        if(not member):
             return JsonResponse({"message":"member ID does not exist","status":"fail"})
        Prevtransactions = member[0].transaction_set.filter(end_date__isnull=True)
        # print("prevtransaction",Prevtransactions)
        totalDebt=0
        date_format = "%Y-%m-%d"
        for singleTransaction in Prevtransactions:
                     current_date = datetime.now().strftime(date_format)
                     formatted_date = datetime.strptime(current_date, date_format).date()
                     date1 = datetime.strptime(str(singleTransaction.created_at), date_format)
                     date2 = datetime.strptime(str(formatted_date), date_format)
                     delta = date2 - date1
                     total_days = delta.days
                     totalDebt=totalDebt+total_days*singleTransaction.price_per_day
        if(totalDebt>500):
            return JsonResponse({"message":"member has a debt exceeding 500","status":"fail"})
            # total_debt=total_debt+
        ##############check condition for already registered or not###############
        previousRegister=Transaction.objects.filter(book=book,member=member[0],end_date__isnull=True)
        if(len(previousRegister)):
            return JsonResponse({"message":"Book already issued","status":"fail"})
        transactions=Transaction(book=book,member=member[0],price_per_day=book.price_per_day)
        book.stock=book.stock-1
        with transaction.atomic():
            book.save()
            transactions.save()
            transactions_dict = model_to_dict(transactions)
            return JsonResponse({"message":"Book successfully issued","status":"success","data":transactions_dict})

    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 
    
@api_view(['PATCH'])
def returnBook(request,transactionID):
    try:
        # current_time = datetime.utcnow()
        # formatted_time = current_time.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        transactions=Transaction.objects.get(id=transactionID)
        if(transactions.end_date):
            return JsonResponse({"message":"Book already returned","status":"fail"})
        date_format = "%Y-%m-%d"
        current_date = datetime.now().strftime(date_format)
        formatted_date = datetime.strptime(current_date, date_format).date()
        transactions.end_date=formatted_date
        total_days=transactions.end_date-transactions.created_at
        print("number of days",transactions.created_at,transactions.end_date)
        date1 = datetime.strptime(str(transactions.created_at), date_format)
        date2 = datetime.strptime(str(transactions.end_date), date_format)
        delta = date2 - date1
        total_days = delta.days
        transactions.total_amount=max(20, total_days*transactions.price_per_day)
        with transaction.atomic():
            transactions.save()
            Book.objects.filter(isbn=transactions.book.isbn).update(stock=F('stock')+1)
            transactions_dict = model_to_dict(transactions)
            return JsonResponse({"message":"Book successfully returned","status":"success","data":transactions_dict})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 

@api_view(['GET'])
def getIssuedBooks(request):
    try:
        pending_transactions=Transaction.objects.filter(end_date__isnull=True).order_by('-created_at')
        transaction_data = []
        for transaction in pending_transactions:
            transaction_data.append({
                'transaction_id': transaction.id,
                'created_at':transaction.created_at,
                'book': {
                    'title': transaction.book.title,
                    'authors': transaction.book.authors,
                    'isbn': transaction.book.isbn,
                    'stock':transaction.book.stock
                },
                'member': {
                    'name': transaction.member.name,    
                    'email': transaction.member.email,
                    'memberID':transaction.member.memberID
                    # ... other member fields ...
                }
            })
        return JsonResponse({"message":"List of books","status":"success","data":transaction_data})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 

@api_view(['GET'])
def getReturnedBooks(request):
    try:
        pending_transactions=Transaction.objects.filter(end_date__isnull=False).order_by('-created_at')
        transaction_data = []
        for transaction in pending_transactions:
            transaction_data.append({
                'transaction_id': transaction.id,
                'created_at':transaction.created_at,
                'end_date':transaction.end_date,
                'total_amount':transaction.total_amount,
                'book': {
                    'title': transaction.book.title,
                    'authors': transaction.book.authors,
                    'isbn': transaction.book.isbn,
                    'stock':transaction.book.stock
                },
                'member': {
                    'name': transaction.member.name,    
                    'email': transaction.member.email,
                    'memberID':transaction.member.memberID
                    # ... other member fields ...
                }
            })
        return JsonResponse({"message":"List of books","status":"success","data":transaction_data})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 