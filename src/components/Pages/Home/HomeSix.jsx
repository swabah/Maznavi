import React, { useState } from 'react'
import { PiWhatsappLogoLight } from 'react-icons/pi';

function HomeSix() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycby5saW9JJ2p8uJ5mcGWhyubFMEPwmhWikMf7jaIa836nVt7YKhmjpHgosbh08-1dtN5/exec';
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: new URLSearchParams({ Email: email }), // Send the email in the request body
        });

        if (response.ok) {
          setSubscribed(true);
        } else {
          console.error('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email', error);
      }
    };
  return (
    <div className='w-full text-[#120f08] bg-[#fff] grid grid-cols-1 gap-5 md:grid-cols-5 h-full p-7 lg:px-10 py-8 md:py-16  xl:px-32'>
         <form onSubmit={handleSubmit}  className='bg-[#3f2d2311] md:col-span-3 h-auto w-full gap-y-1.5  rounded-xl p-6 md:px-10 lg:px-24  flex flex-col items-center'>
            <h2 className="text-xl md:text-3xl lg:text-4xl w-full text-center">Never Miss A Update !</h2>
            <input 
              value={email}
              required
              pattern="[^@]*@[^@]*[.com]"
              onChange={(e) => setEmail(e.target.value)}
              className="h-full rounded-3xl w-full bg-[#3f2d2319] mt-4 p-2.5 px-6 placeholder:text-black" type="email" name="Email" placeholder="Enter Your Email" id="Email" />
              <button type="submit" className=' border-[#3f2d2319] bg-[#3f2d230c] active:bg-[#3f2d2319] border-2 font-medium rounded-3xl text-lg py-1 w-full mt-3 items-center justify-center flex h-auto'>
                {subscribed ? <p className="text-base py-1">Thanks For Your Subscription !</p> :<h2>Submit</h2> }
              </button>
        </form>
        <div className='w-full h-full bg-[#3f2d2311] gap-5 p-6 md:px-10 lg:px-16 flex items-center md:col-span-2 rounded-xl'>
            <PiWhatsappLogoLight className='text-3xl md:text-5xl lg:text-6xl'/>
            <div className='flex flex-col items-start'>
                <p className='text-sm md:text-lg font-thin'>Join Our</p>
                <h2 className='text-xl md:text-2xl lg:text-4xl'>WhatsApp Group</h2>
                <p className='text-sm md:text-lg font-thin'>To get instant updates.</p>
            </div>
        </div>
    </div>
  )
}

export default HomeSix