import React from 'react'

function parseEmphasis(text)  {
    const parts = text?.split('*');
    return parts?.map((part, index) => {
      if (index % 2 === 1) {
        // Apply emphasis styling to odd-indexed parts (between the markers)
        return <strong key={index}>{part}</strong>; // You can also use <em> for italic
      } else {
        return part;
      }
    });
  };

export default parseEmphasis