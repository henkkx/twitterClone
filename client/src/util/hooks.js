import { useState , useEffect} from 'react'

export const useForm = (callback, initalState = {}) => {
    const [ values, setvalues ] = useState(initalState);

	const onChange = (event) => {
		setvalues({ ...values, [event.target.name]: event.target.value });
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        callback()
    };
    
    return {
        onChange,
        onSubmit,
        values
    }
}


export const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};
