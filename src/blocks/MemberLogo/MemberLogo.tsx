import type { MemberLogoFragment } from '@lib/types/datocms';
import clsx from 'clsx';
import { useMemo } from 'react';
import { SRCImage } from 'react-datocms';
import './MemberLogo.css';

export const MemberLogo = (
  props: MemberLogoFragment & { className?: string },
) => {
  const backgroundColor = useMemo(() => {
    if (props.brandColor?.hex) {
      return props.brandColor.hex;
    }

    if (props.logo.responsiveImage?.bgColor === '#ffffff') {
      return 'var(--color-text)';
    }

    return 'var(--color-text-inverse)';
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
