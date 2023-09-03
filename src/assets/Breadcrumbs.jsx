import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem , BreadcrumbLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import React from 'react';

function Breadcrumbs({ one, oneTo, currentPage }) {
  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <Link to="/">Home</Link> {/* Use Link instead of BreadcrumbLink */}
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to={oneTo}>{one}</Link> {/* Use Link instead of BreadcrumbLink */}
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink className='truncate w-9/12 md:w-full'>
        {currentPage}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
