import React, { Component } from 'react';

import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  LinkedinShareButton,
  EmailShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
  EmailIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Share(props) {
    const [copied, setCopied] = React.useState(false);

    const shareUrl = 'https://www.pakkamarwadi.tk/';
    return (
      <div
        style={{
         textAlign: 'center',
          height: '100px',
          width: '100%',
          zIndex: 2

        }}
      >
        <h1
        style={{
           
             backgroundColor:'#087cc4',
             width: '100%',
            color: 'white',
            marginBottom:'10px'
   
           }}
        >يمكنك المشاركة من خلال </h1>

        <FacebookShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>

        <EmailShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>

        <TwitterShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <TelegramShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
        <FacebookMessengerShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <FacebookMessengerIcon size={40} round={true} />
        </FacebookMessengerShareButton>
        <RedditShareButton
          url={shareUrl}
          quote={'Title or jo bhi aapko likhna ho'}
          hashtag={'#portfolio...'}
        >
          <RedditIcon size={40} round={true} />
        </RedditShareButton>
        <div className={copied ? 'Share-code Share-applied' : 'Share-code'} >
        <div className="black-code">{shareUrl}</div>{
          copied ? <div className="Share-copied">Copied!</div>:
            <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
              <div className="copy">Copy</div>
            </CopyToClipboard>
        }</div>
      </div>
    );

}