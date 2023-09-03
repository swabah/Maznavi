import React from 'react';

function PostsDemo({ h , count}) {
  const numDivs = count; // You can directly pass the prop value here

  const renderDivs = () => {
    const divs = [];
    for (let i = 0; i < numDivs; i++) {
      divs.push(
        <div key={i} className={`w-full bg-black bg-opacity-20 animate-pulse ${h}`}></div>
      );
    }
    return divs;
  };

  return <>{renderDivs()}</>;
}

export default PostsDemo;
