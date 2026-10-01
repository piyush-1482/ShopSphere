resource "aws_internet_gateway" "shopsphere_igw" {
  vpc_id = aws_vpc.shopsphere_vpc.id

  tags = {
    Name = "shopsphere-igw"
  }
}
