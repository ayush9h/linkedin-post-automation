import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import {SyncLoader} from 'react-spinners'

export default function ImageQuery({image, setImage}){
    const [imageQuery, setImageQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleGenerateImage = async () => {
        setLoading(true);
        try {
          const imageResponse = await axios.post(
            'http://localhost:5000/api/v1/generate-image',
            {
              query: imageQuery,
            },
            { responseType: 'blob' }
          );
    
          const imageURL = URL.createObjectURL(imageResponse.data);
          setImage(imageURL);
          setLoading(false);
        } catch (error) {
          setLoading(false)
          console.error('Error generating image:', error);
        }
      };
    return(
        <>
         <h3 className="max-width text-2xl font-bebas">Image Generation</h3>
         <p className="max-width text-md font-montserrat mt-3 text-gray-500">Generate post image for LinkedIn.</p>
        <div className="max-width p-6 mt-3 bg-white border border-zinc-300 rounded-xl shadow-md">
          
          <textarea
            value={imageQuery}
            onChange={(e) => setImageQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn Image"
            className="w-full h-32 p-6 mt-2 bg-zinc-100 border border-zinc-300 rounded-xl resize-none font-montserrat"
          />
          <button
            onClick={handleGenerateImage}
            className={`flex items-center justify-center px-4 py-2 mt-2 text-white rounded-full font-montserrat text-md ${loading ? 'bg-gray-400 cursor-not-allowed' :' bg-blue-600 hover:bg-blue-700'}`}
          >
           {loading ? (<> Generating Image <SyncLoader className='ml-2' size={5} color='#ffffff' /></>): (<>Generate Image <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />'</>)}
          </button>
          {image && (
            <div>
              <h4 className="mt-5 text-md font-montserrat font-semibold">Generated Image:</h4>
              <img src={image} alt="Generated" className="mt-2 rounded-xl" />
            </div>
          )}
        </div>
        </>
    )
}