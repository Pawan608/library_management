from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, EmailValidator
from django.utils import timezone

class Book(models.Model):
    bookID =  models.CharField(max_length=100, null=True)
    title = models.TextField(null=True)
    authors = models.CharField(max_length=100, null=True)
    average_rating = models.FloatField(null=True, blank=True, default=None, validators=[MinValueValidator(0), MaxValueValidator(5)])
    isbn13 = models.PositiveBigIntegerField(unique=True)
    isbn = models.CharField(max_length=100,unique=True,primary_key=True)
    language_code = models.CharField(max_length=10)
    ratings_count = models.IntegerField(null=True, blank=True)
    text_reviews_count = models.IntegerField(null=True, blank=True)
    publication_date = models.DateField()
    publisher = models.CharField(max_length=255, null=True)
    stock = models.IntegerField(default=0, null=False)  # Add the stock field with a default value of 0
    price_per_day = models.IntegerField(default=20)
    def __str__(self):
        return self.title

class Member(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=False,blank=False,validators=[EmailValidator()])
    memberID = models.CharField(max_length=100, unique=True, editable=False,null=False,blank=False)

    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    created_at = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    price_per_day = models.IntegerField(null=False)
    total_amount=models.IntegerField(null=True, blank=False)

    def __str__(self):
        return f"Transaction for {self.book.title} by {self.member.name}"