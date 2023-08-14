
from django.http import JsonResponse

class GlobalErrorHandlingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except Exception as e:
            return self.handle_exception(e)

        return response

    def handle_exception(self, exception):
        if hasattr(exception, 'message'):
            error_message = str(exception.message)
        else:
            error_message = "An error occurred"

        return JsonResponse({"error": error_message})
