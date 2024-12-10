import { Button } from '@components/Button';
import { Form, TextField } from '@components/Forms';
import { t } from '@lib/i18n';

export const RegisterForm = () => {
  return (
    <Form submitButton={
      <Button type="submit" icon='arrow-right'>{t('sign_me_up')}</Button>
    }>
      <TextField name="firstName" label={t('first_name')} labelStyle="float" />
      <TextField name="lastName" label={t('last_name')} labelStyle="float" />
      <TextField name="position" label={t('position')} labelStyle="float" />
      <TextField name="company" label={t('company_name')} labelStyle="float" />
      <TextField
        type="email"
        name="emailAddress"
        label={t('email_address')}
        labelStyle="float"
      />
      <TextField
        type="tel"
        name="phoneNumber"
        label={t('phone_number')}
        labelStyle="float"
      />
    </Form>
  );
};
