from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.utils import IntegrityError
from django.db.models import F, Sum
import json
from .models import Book, Member, Transaction
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pprint
from datetime import datetime
import requests
from django.forms.models import model_to_dict
from django.utils import timezone

@api_view(['GET'])
def getSummary(request):
    today = timezone.now()
    start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_of_month = start_of_month.replace(month=today.month + 1, day=1) - timezone.timedelta(days=1)
    
    try:
    
        print("new print",start_of_month,end_of_month)
        # Calculate the sum of price_per_day for transactions in the current month
        total_price_per_day = Transaction.objects.filter(
            end_date__isnull=False,
            created_at__gte=start_of_month,
            created_at__lte=end_of_month,
            
        ).aggregate(total_price=Sum('total_amount'))['total_price']
        if total_price_per_day is None:
            total_price_per_day = 0
        
        ########################################
        # calculating issued books
        issued_books_count=Transaction.objects.filter(end_date__isnull=True).count()

        #########################################
        # calculating total Members

        total_members=Member.objects.all().count()

        ##########################################
        # Calculating total books

        total_books=Book.objects.all().count()
        return JsonResponse({"message":"Book successfully returned","status":"success","data":{
            "month_count":total_price_per_day,"issue_count":issued_books_count,"members_count":total_members,"books_count":total_books
        }})
    except IntegrityError as e:
        error_message=str(e)
        return JsonResponse({"message":"Integrity error",'error_message':error_message},status=404)
    except ValidationError as e:
        response_data = {'message': 'Validation error', 'error_message': str(e)}
        return JsonResponse(response_data, status=400)  
    except Exception as e:
        response_data = {'message': 'An error occurred', 'error_message': str(e)}
        return JsonResponse(response_data, status=500) 
