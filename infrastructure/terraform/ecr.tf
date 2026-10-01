resource "aws_ecr_repository" "shopsphere_backend" {
  name                 = "shopsphere-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "shopsphere-backend"
  }
}

resource "aws_ecr_repository" "shopsphere_frontend" {
  name                 = "shopsphere-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "shopsphere-frontend"
  }
}
