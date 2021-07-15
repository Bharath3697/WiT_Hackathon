# Author  - Bharath.K (bharatk7@in.ibm.com)
from django import forms
from django.forms import ModelForm


def validate_file_extension(value):
    extension = value.name.split(".")[1]
    if not extension.lower() in ["jpg", 'png', 'jfif', 'jpeg']:
        raise forms.ValidationError("Only Image files are accepted")


class DocumentForm(forms.Form):
    imagefile = forms.FileField(
        label='', validators=[validate_file_extension], required=True)

    def decode_utf8(self, input_iterator):
        for l in input_iterator:
            yield l.decode('utf-8')
