import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { PaginationButtonProps, PaginationProps } from './type';

export default function Pagination(props: PaginationProps) {
  const { total, currentPage, rowSize = 10 } = props;
  const totalPage = Math.ceil(total / rowSize);
  if (!(currentPage > 0 && totalPage >= currentPage)) return null;

  // Pagination config
  const lowLength = 3;
  const upLength = 3;
  const midLength = 1;
  const maxBlock = lowLength + midLength * 2 + upLength + 3; //low length + uplength+twice midlength+two betweenSegment+1 middle

  let midCount = 0;
  const pages: JSX.Element[] = [];
  let state: 'left' | 'leftMiddle' | 'middle' | 'rightMiddle' | 'right' = 'left';
  let i = 1;
  while (i <= totalPage) {
    switch (state) {
      case 'left':
        if (i === lowLength) state = 'leftMiddle';
        pages.push(
          <PageButton
            isCurrent={i === props.currentPage}
            page={i}
            target={i}
            handlePageChange={props.handlePageChange}
            key={`page-button-${pages.length}`}
          />
        );
        i++;
        break;
      case 'leftMiddle':
        if (i < currentPage - midLength && totalPage > maxBlock) {
          const prevI = i - 1;
          i = Math.min(currentPage - midLength, totalPage - upLength - (midLength * 2 + 1));
          pages.push(
            <PageButton
              isCurrent={false}
              page={'...'}
              target={Math.floor((i + prevI) / 2)}
              handlePageChange={props.handlePageChange}
              key={`page-button-${pages.length}`}
            />
          );
        } else {
          pages.push(
            <PageButton
              isCurrent={i === props.currentPage}
              page={i}
              target={i}
              handlePageChange={props.handlePageChange}
              key={`page-button-${pages.length}`}
            />
          );
          i++;
        }
        state = 'middle';
        break;
      case 'middle':
        if (midCount === midLength * 2) state = 'rightMiddle';
        pages.push(
          <PageButton
            isCurrent={i === props.currentPage}
            page={i}
            target={i}
            handlePageChange={props.handlePageChange}
            key={`page-button-${pages.length}`}
          />
        );
        i++;
        midCount++;
        break;
      case 'rightMiddle':
        if (i < totalPage - upLength && totalPage > maxBlock) {
          const prevI = i - 1;
          i = totalPage - upLength + 1;
          pages.push(
            <PageButton
              isCurrent={false}
              page={'...'}
              target={Math.floor((i + prevI) / 2)}
              handlePageChange={props.handlePageChange}
              key={`page-button-${pages.length}`}
            />
          );
        } else {
          pages.push(
            <PageButton
              isCurrent={i === props.currentPage}
              page={i}
              target={i}
              handlePageChange={props.handlePageChange}
              key={`page-button-${pages.length}`}
            />
          );
          i++;
        }
        state = 'right';
        break;
      case 'right':
        pages.push(
          <PageButton
            isCurrent={i === props.currentPage}
            page={i}
            target={i}
            handlePageChange={props.handlePageChange}
            key={`page-button-${pages.length}`}
          />
        );
        i++;
        break;
      default:
        throw new Error('Uncovered state');
    }
  }
  return <HStack>{pages}</HStack>;
}

function PageButton(props: PaginationButtonProps) {
  console.log('reactive');
  return (
    <Button
      variant="outline"
      onClick={() => props.handlePageChange(props.target)}
      backgroundColor={props.isCurrent ? 'activeBlue' : 'baseGreen'}
      _hover={{ bg: 'hoverGreen' }}
    >
      {props.page}
    </Button>
  );
}
