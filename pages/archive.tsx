import type {NextPage} from 'next';
import Main from 'layouts/Main';
import {Events} from 'components/composed/Events';
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';

const Archive: NextPage = () => {
  const {pathname} = useRouter();
  return (
    <>
      <NextSeo
        title='All Upcoming Conversations'
        openGraph={{
          url: `https://convo.kernel.community` + {pathname},
          title: `KERNEL Convo`,
          description: 'A home for conversations taking place in the Kernel network',
          images: [
            {
              url: 'https://confab-frontend.vercel.app/images/banner.jpg',
              alt: 'KERNEL squares and circles',
              type: 'image/jpeg',
            },
          ],
          site_name: 'KERNEL Convo',
        }}
      />
      <Main>
        <div className='
          lg:px-32
          md:px-12
          px-6
        '>
          <div className="
              font-heading
              font-bold
              text-5xl
              text-primary
              lg:py-5
              lowercase
            ">
            Archive
          </div>
          <Events
            type='past'
            take={50}
            infinite={true}
          />
        </div>
      </Main>
    </>
  );
};
export default Archive;
