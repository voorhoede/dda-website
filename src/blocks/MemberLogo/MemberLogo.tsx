import type { MemberLogoFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';
import './MemberLogo.css';

export const MemberLogo = (props: MemberLogoFragment) => {
  return (
    <div
      className="member-logo"
      style={{
        backgroundColor: props.brandColor?.hex,
      }}
    >
      {props.logo?.responsiveImage && (
        <SRCImage data={props.logo.responsiveImage} />
      )}
    </div>
  );
};
