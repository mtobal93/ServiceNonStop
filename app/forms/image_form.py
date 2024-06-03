from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField

class ImageForm(FlaskForm):
    image = FileField('Image File', validators=[FileRequired(), FileAllowed()])
    submit = SubmitField('Create Post')