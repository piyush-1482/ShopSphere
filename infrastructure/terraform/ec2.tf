data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "shopsphere_ec2" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"

  subnet_id                   = aws_subnet.shopsphere_public_subnet.id
  vpc_security_group_ids      = [aws_security_group.shopsphere_sg.id]
  associate_public_ip_address = true

  iam_instance_profile = aws_iam_instance_profile.shopsphere_ec2_profile.name

  tags = {
    Name = "shopsphere-ec2"
  }
}
