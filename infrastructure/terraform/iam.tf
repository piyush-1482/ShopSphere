resource "aws_iam_role" "shopsphere_ec2_role" {
  name = "shopsphere-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "shopsphere-ec2-role"
  }
}

resource "aws_iam_role_policy_attachment" "shopsphere_ecr_readonly" {
  role       = aws_iam_role.shopsphere_ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "shopsphere_ec2_profile" {
  name = "shopsphere-ec2-profile"
  role = aws_iam_role.shopsphere_ec2_role.name
}
