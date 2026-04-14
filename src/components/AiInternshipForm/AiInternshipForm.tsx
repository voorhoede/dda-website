import { Button } from '@components/Button';
import { Form, TextField } from '@components/Forms';
import { t } from '@lib/i18n';

type Props = {
  internshipId: string;
  toEmail: string;
};

export const AiInternshipForm = ({ internshipId, toEmail }: Props) => {
  return (
    <Form
      action="/api/ai-stages"
      method="POST"
      submitButton={<Button type="submit" icon='arrow-right'>{t('send')}</Button>}
    >
      <input type="hidden" name="id" value={internshipId} />
      <input type="hidden" name="to-email" value={toEmail} />
      
      <TextField name='name' label={t('name')} required autoComplete='name'/>
      <TextField name='email' label={t('email_address')} type='email' required autoComplete='email'/>
      <TextField name='phone' label={t('phone_number')} type='tel' required autoComplete='tel'/>
      <TextField name='track' label={t('track')} type='text' required autoComplete='off'/>
      <TextField name='institution' label={t('institution')} type='text' required autoComplete='off'/>
      <TextField name='linkedin' label={t('linkedin_profile')} type='text' autoComplete='off'/>
      <TextField name='portfolio' label={t('portfolio_link')} type='text' autoComplete='off'/>
    </Form>
  );
};
