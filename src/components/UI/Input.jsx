import React, { useId } from 'react';

const Input = ({ label, type = 'text', className = '', ...props }, ref) => {
	const id = useId();
	return (
		<div className=''>
			{label && <label className='text-gray-600' htmlFor={id}>{label}</label>}
			<input
				type={type}
				className={`w-full p-4 rounded-xl border-2 border-gray-300 ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	);
};

export default React.forwardRef(Input);
