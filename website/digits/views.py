import base64
import json

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .recognizer import RecognizeImageData

def index(request):
	return HttpResponse(render(request, "digits/digit_identify.html"))

@csrf_exempt
def identify(request):
	if request.method == 'POST':
		jsonData = json.loads(request.body)
		image_data = jsonData['imageData']
		imageData = base64.b64decode(bytes(image_data, encoding='utf-8'))
		result = RecognizeImageData(imageData)
		return JsonResponse({
			'result': result
		})
	return HttpResponse("what to identify???")