from django.urls import path
from . import books
from . import members
from . import transaction

urlpatterns=[
    path("books/create",books.createBook),
    path('books/search/', books.search_books, name='search_books'),
    path("books/addstock/<str:isbn>",books.addStock),
    path("books/csrf",books.csrf_get),

    #######Member Route
    path("member/create",members.createMember),
    path("member/getmembers",members.getAllMembersAndTransactions),

    ######Transaction Route
    path("transaction/create/<str:isbn>/<Id>",transaction.creatTransaction),
    path("transaction/return/<transactionID>",transaction.returnBook),
    path("transaction/list/issued",transaction.getIssuedBooks),
    path("transaction/list/returned",transaction.getIssuedBooks),
]