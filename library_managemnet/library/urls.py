from django.urls import path
from . import books
from . import members
from . import transaction
from . import aggregation

urlpatterns=[
    path("books/create",books.createBook),
    path('books/search/', books.search_books, name='search_books'),
    path("books/addstock/<str:isbn>",books.addStock),
    path("books/changerent/<str:isbn>",books. changeRent),
    path("books/csrf",books.csrf_get),
    path("books",books.getAllBooks),
    #######Member Route
    path("member/create",members.createMember),
    path("member/getmembers",members.getAllMembersAndTransactions),

    ######Transaction Route
    path("transaction/create/<str:isbn>/<memberID>",transaction.creatTransaction),
    path("transaction/return/<transactionID>",transaction.returnBook),
    path("transaction/list/issued",transaction.getIssuedBooks),
    path("transaction/list/returned",transaction.getReturnedBooks),

    ######Run Aggregation
    path("summary",aggregation.getSummary),
]