import { Column, Grid } from '@components/Grid';
import './PublicationsList.css';

export const PublicationsList = ({ data }) => { 
  return (
    <Grid as="ul">
      {data.map((item) => (
        <Column key={item.id} as="li" span={3} className='publications-list-item'>{ item.title }</Column>
      ))}
    </Grid>
  );
};
