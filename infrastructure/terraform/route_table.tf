resource "aws_route_table" "shopsphere_public_rt" {
  vpc_id = aws_vpc.shopsphere_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.shopsphere_igw.id
  }

  tags = {
    Name = "shopsphere-public-rt"
  }
}

resource "aws_route_table_association" "shopsphere_public_association" {
  subnet_id      = aws_subnet.shopsphere_public_subnet.id
  route_table_id = aws_route_table.shopsphere_public_rt.id
}
