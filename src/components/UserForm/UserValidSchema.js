import * as Yup from 'yup';

const regexPhone = /^\+380\d{9}$/;
// const regexPhone = /^\d{2} \(\d{3}\) \d{3} \d{2} \d{2}$/;
const regexSkype = /^\S[\S\s]{0,28}\S$/;

export const UserValidSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name is too short')
      .max(16, 'Name is too long'),
    birthday: Yup.string().notRequired(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(
        regexPhone,
        'The phone number must start with +380 and be 9 digits long'
      )
      .min(13, 'Phone is too Short!')
      .max(13, 'Phone is too Long!')
      .notRequired(),
    skype: Yup.string()
      .matches(regexSkype, 'Skype must be between 3 and 16 characters')
      .max(13, 'At most 13 digits is required')
      .test(
        'Skype-validation',
        'Skype must be at least 3 characters long',
        value => {
          return value && value.replace(/\s/g, '').length >= 3;
        }
      ),
  });
