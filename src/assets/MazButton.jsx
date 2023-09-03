import React from 'react'

function MazButton({Link,Icon}) {
  
  return (
    <div onClick={Link} className="p-0.5 md:p-2 cursor-pointer bg-transparent text-white md:text-[#3f2d23] md:bg-white rounded-xl text-lg md:text-xl md:hover:bg-gray-100">
       {Icon}
    </div>
  )
}

export default MazButton