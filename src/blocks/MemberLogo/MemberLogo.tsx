import { useMemo } from 'react';
import type { MemberLogoFragment } from '@lib/types/datocms';
import { SRCImage } from 'react-datocms';
import clsx from 'clsx';
import './MemberLogo.css';

export const MemberLogo = (
  props: MemberLogoFragment & { className?: string },
) => {
  const backgroundColor = useMemo(() => {
    if (props.brandColor?.hex) {
      return props.brandColor.hex;
    }

    if (props.logo.responsiveImage?.bgColor === '#ffffff') {
      return 'var(--color-black)';
    }

    return 'var(--color-white)';
  }, [props.brandColor?.hex]);

  return (
    <div
      className={clsx('member-logo', props.className)}
      style={{
        backgroundColor,
      }}
    >
      {props.logo?.responsiveImage && (
        <SRCImage
          data={props.logo.responsiveImage}
          // disable placeholder for logo
          // since its background can be transparent,
          // causing placeholder to be visible after loading
          usePlaceholder={false}
          priority={true}
        />
      )}
    </div>
  );
};
