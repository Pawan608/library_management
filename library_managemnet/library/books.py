from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.utils import IntegrityError
from django.db.models import F
import json
from .models import Book
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pprint
from datetime import datetime
from django.forms.models import model_to_dict
# Create your views here.

from django.middleware.csrf import get_token

def csrf_get(request):
    csrf_token = get_token(request)
    return HttpResponse(csrf_token)

@api_view(['POST']) 
def createBook(request):
    # print("request",f"'{request.data['data']}'")
    data=request.data['data']
   
    if(not len(data)):
       response_data = {'message': 'An error occurred', 'error_message': "Kindly provide data correctly"}
       return JsonResponse(response_data, status=500) 
    
    isbn_list = [book["isbn"] for book in data]
    # print (isbn_list)
    items=Book.objects.filter(isbn__in=isbn_list)        ################Extracting the list of ISBN from the body######################
    # print ("items",items)
    isbn_list_found=[str(book.isbn) for book in items ]    ################ISBN WHich already exists####################### 
    data_with_given_isbn = []
    data_without_given_isbn = []
    input_format = "%m/%d/%Y"
    # print ("isbn_list_found",isbn_list_found)
    for book in data:
        if book["isbn"] in isbn_list_found:

            data_with_given_isbn.append(book)
        if book["isbn"] not in isbn_list_found:
            # print('"book["isbn"]"',book["isbn"],isbn_list_found)
            # print ("data_without_given_isbn",data_without_given_isbn)
            data_without_given_isbn.append(Book(bookID=str(book['bookID']),title=book['title'],authors=book['authors'],average_rating=book['average_rating'],
                                                publisher=book['publisher'],isbn13=book['isbn13'],
                                                isbn= book['isbn'],language_code=book['language_code'],ratings_count=book['ratings_count'],
                                                text_reviews_count=book['text_reviews_count'],stock=book['stock'],price_per_day=book['price_per_day'],
                                                publication_date=datetime.strptime(book['publication_date'],input_format).strftime("%Y-%m-%d")))
    try:
        with transaction.atomic():
            new_list=[]
            if(len(data_without_given_isbn)):
                created_new_books=Book.objects.bulk_create(data_without_given_isbn)
                # new_list.append(list(created_new_books.v))
                for book in created_new_books:
                    # print("alllll book",{**book})
                    print("bookssss",book)
                    new_list.append({
                        "bookID":book.bookID,
                        "title":book.title,
                        "authors":book.authors,
                        "publisher":book.publisher,
                        "isbn":book.isbn,
                        "isbn13":book.isbn13,
                        "stock":book.stock
                    })
                print("created_new_books",created_new_books,new_list)
            
            for book in data_with_given_isbn:
                # print ("boookkss",book)
                num_updated = Book.objects.filter(isbn=book["isbn"]).update(stock=F('stock') + book["stock"])
                updated_books=Book.objects.filter(isbn=book["isbn"])
                new_list.extend(list(updated_books.values()))
            print("created new",new_list)
            return JsonResponse({"message":"Books successfully imported","status":"success","data":new_list})

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
def search_books(request):
    try:
        title = request.GET.get('title', '')
        authors = request.GET.get('authors', '')
        isbn = request.GET.get('isbn', '')
        queryParams={}
        if(title):
            queryParams['title__icontains']=title
        if(authors):
            queryParams['authors']=authors
        if(isbn):
            queryParams['isbn']=isbn
      
        print("queryParams",queryParams)
        books=Book.objects.filter(**queryParams)
        filteredData={
            "books":books
        }
        print("filtered obj",filteredData)
        
        # print ("hsjahjshajhj",books.all())
        return JsonResponse({"message":"List of books","status":"success","data":list(books.values())})
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
def addStock(request,isbn):
    try:
        stock=request.data['stock']
        book=Book.objects.get(isbn=isbn)
        book.stock=book.stock+stock
        book.save()
        book_dict = model_to_dict(book)
        print("bookdict",book_dict)
        return JsonResponse({"message":"Stock successfully updated","status":"success","data":book_dict})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 

         
