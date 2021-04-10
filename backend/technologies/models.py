
# technologies/models.py

from django.db import models
# Create your models here.

# add project
class Technologie(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()

    def __str__(self):
        return self.title
# add operation 
class Operation(models.Model):
  technologie = models.ForeignKey(Technologie, on_delete=models.CASCADE)
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.title
