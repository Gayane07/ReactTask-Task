export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validate = (field, data) => {
	switch (field) {
	  case 'name':
		  if (!data.name) return 'Please enter name';
		  return null;
	  case 'email':
		  if (!data.email) return 'Please enter email';
		  if (data.email.length < 6) return 'Email must be at least 6 characters';
		  if (!data.email.match(emailRegex)) return 'Please enter valid email';
		  return null;
	  case 'phone':
		  if (!data.phone) return 'Please enter phone number';
		  if (data.phone.length < 6) return 'Phone number must be at least 6 characters';
	  default:
		  return null;
	}
  };