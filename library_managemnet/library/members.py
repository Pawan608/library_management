from django.http import JsonResponse,HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.utils import IntegrityError
from django.db.models import F
import json
from .models import Book,Member
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pprint
from datetime import datetime
from django.forms.models import model_to_dict
from django.utils import timezone
from django.db.models import Exists, OuterRef,Count

@api_view(['POST']) 
def createMember(request):
    data=request.data['data']
    print("new Data",data)
    try:
        prevRecord=Member.objects.filter(email=data['email'])
        print("previous email",prevRecord)
        if(len(list(prevRecord.values()))):
            return JsonResponse({"message":"Member already exists","status":"fail"})
        username_part=data['email'].split("@")[0]
        timestamp_part = str(timezone.now().strftime('%Y%m%d%H%M%S'))
        memberID = f"{username_part}_{timestamp_part}"
        # print("memberID",memberID)
        member=Member(**data,memberID=memberID)
        member.save()
        member_dict = model_to_dict(member)
        member_dict['memberID']=memberID
        # print("new member",member_dict)
        return JsonResponse({"message":"Member successfully added","status":"success","data":member_dict})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 
    
# @api_view(['GET'])
# def getMember
@api_view(['GET'])
def getAllMembersAndTransactions(request):
    try:
        member_data = []
        members_with_transactions = Member.objects.annotate(num_transactions=Count('transaction')).filter(num_transactions__gt=0)
        for member in members_with_transactions:
            transactions = member.transaction_set.all()
            transaction_data = []
            totalDebt=0
            current_issue=0
            for transaction in transactions:
                date_format = "%Y-%m-%d"
                total_days=0
                if(not transaction.end_date):      
                     current_date = datetime.now().strftime(date_format)
                     formatted_date = datetime.strptime(current_date, date_format).date()
                     date1 = datetime.strptime(str(transaction.created_at), date_format)
                     date2 = datetime.strptime(str(formatted_date), date_format)
                     delta = date2 - date1
                     total_days = delta.days
                     totalDebt=totalDebt+total_days*transaction.price_per_day
                     current_issue=current_issue+1
                else:
                     date1 = datetime.strptime(str(transaction.created_at), date_format)
                     date2 = datetime.strptime(str(transaction.end_date), date_format)
                     delta = date2 - date1
                     total_days = delta.days
                     totalDebt=totalDebt+total_days*transaction.price_per_day
                transaction_data.append({
                    'transaction_id': transaction.id,
                    'created_at': transaction.created_at,
                    'end_date': transaction.end_date,
                    'book_title': transaction.book.title,
                    'price_per_day': transaction.price_per_day,
                    'total_amount':total_days*transaction.price_per_day,
                    'isbn':transaction.book.isbn
                })
            
            member_data.append({
                'id': member.id,
                'name': member.name,
                'email': member.email,
                'transactions': transaction_data,
                "debt":totalDebt,
                "memberID":member.memberID,
                "current_issue":current_issue
            })
        members_without_transactions = Member.objects.annotate(num_transactions=Count('transaction')).filter(num_transactions=0)
        member_data.extend(list(members_without_transactions.values()))
        return JsonResponse({'message': 'Members with transactions retrieved', 'members': member_data,"status":"success"})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 
