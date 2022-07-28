import { createForm } from 'effector-forms';
import rules from '../../../../utils/validationRules';

export const editProfileForm = createForm({
  fields: {
    UserName: {
      init: '',
      rules: [
        rules.minLength(3)
      ],
    },
    Password: {
      init: '',
      rules: [
        rules.minLength(3),
      ],
    },
  },
  validateOn: ['change', 'submit'],
})