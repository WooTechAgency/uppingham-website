'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/components/ui/Link';
import { Image } from '@/components/ui/Image';
import { cn } from '@/lib/utils/cn';
import { Text } from '../ui/Text';
import { Heading } from '../ui/Heading';

export function SiteFooter() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone pt-25">
      {/* Main Footer Content */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[clamp(60px,6vw,145px)] ">
          {/* Column 1: School Emblem & Copyright */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 2xl:gap-12">
            {/* Column 1.1: School Emblem & Copyright */}
            <div className="flex flex-col items-start gap-[75px]">
              <div className="relative w-[clamp(180px,18vw,237px)] aspect-[237/296]">
                <Image
                  src="/uppingham-logo.svg"
                  alt="Uppingham School Crest"
                  className="object-contain"
                  fill
                />
              </div>
              <Text
                as="p"
                variant="tag"
                align="center"
                className="text-secondary font-tag"
              >
                {t('copyright', { year: currentYear })}
              </Text>
            </div>

            {/* Column 1.2: Address & Contact */}
            <div className="flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-6">
                <Text
                  as="h3"
                  variant="smallHeading"
                  align="left"
                  className="text-secondary"
                >
                  {t('address.title')}
                </Text>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-5">
                    <div className=" p-1 flex-shrink-0 w-8 h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22.0014 16.9201V19.9201C22.0025 20.1986 21.9455 20.4743 21.8339 20.7294C21.7223 20.9846 21.5587 21.2137 21.3535 21.402C21.1483 21.5902 20.906 21.7336 20.6421 21.8228C20.3783 21.912 20.0988 21.9452 19.8214 21.9201C16.7442 21.5857 13.7884 20.5342 11.1914 18.8501C8.77523 17.3148 6.72673 15.2663 5.1914 12.8501C3.50138 10.2413 2.44964 7.27109 2.1214 4.1801C2.09641 3.90356 2.12927 3.62486 2.2179 3.36172C2.30652 3.09859 2.44897 2.85679 2.63616 2.65172C2.82336 2.44665 3.0512 2.28281 3.30519 2.17062C3.55917 2.05843 3.83374 2.00036 4.1114 2.0001H7.1114C7.5967 1.99532 8.06719 2.16718 8.43516 2.48363C8.80313 2.80008 9.04348 3.23954 9.1114 3.7201C9.23802 4.68016 9.47285 5.62282 9.8114 6.5301C9.94594 6.88802 9.97506 7.27701 9.8953 7.65098C9.81555 8.02494 9.63026 8.36821 9.3614 8.6401L8.0914 9.9101C9.51495 12.4136 11.5879 14.4865 14.0914 15.9101L15.3614 14.6401C15.6333 14.3712 15.9766 14.1859 16.3505 14.1062C16.7245 14.0264 17.1135 14.0556 17.4714 14.1901C18.3787 14.5286 19.3213 14.7635 20.2814 14.8901C20.7672 14.9586 21.2108 15.2033 21.5279 15.5776C21.8451 15.9519 22.0136 16.4297 22.0014 16.9201Z"
                          stroke="#00003C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Link
                      href={`tel:${t('address.phone').replace(/\s/g, '')}`}
                      variant="body"
                    >
                      {t('address.phone')}
                    </Link>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className=" p-1 flex-shrink-0 w-8 h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                          stroke="#00003C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 6L12 13L2 6"
                          stroke="#00003C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Link href={`mailto:${t('address.email')}`} variant="body">
                      {t('address.email')}
                    </Link>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className=" p-1 flex-shrink-0 w-8 h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                          stroke="#00003C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                          stroke="#00003C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <Link href={`mailto:${t('address.email')}`} variant="body">
                      {t('address.location')}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  href={`/${locale}/contact`}
                  variant="smallHeading"
                  className="ml-[50px]"
                >
                  {t('address.contactUs')}
                </Link>
                <Link
                  href={`/${locale}/directions`}
                  variant="smallHeading"
                  className="ml-[50px]"
                >
                  {t('address.directions')}
                </Link>
                <Link
                  href={`/${locale}/where-to-stay`}
                  variant="smallHeading"
                  className="ml-[50px]"
                >
                  {t('address.whereToStay')}
                </Link>
              </div>
            </div>
          </div>
          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6 lg:gap-12 justify-between">
            {/* Row 2.1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 2.1.1: Quick Links */}
              <div className="flex flex-col gap-6 lg:col-span-1">
                <Text
                  as="h3"
                  variant="smallHeading"
                  align="left"
                  className="text-secondary min-h-[30px]"
                >
                  {t('quickLinks.title')}
                </Text>
                <div className="flex flex-col gap-6">
                  <Link
                    href={`/${locale}/admissions`}
                    variant="body"
                    className="text-primary min-h-[32px] flex items-center"
                  >
                    {t('quickLinks.admissions')}
                  </Link>
                  <Link
                    href={`/${locale}/careers`}
                    variant="body"
                    className="text-primary min-h-[32px] flex items-center"
                  >
                    {t('quickLinks.careers')}
                  </Link>
                  <Link
                    href={`/${locale}/calendar`}
                    variant="body"
                    className="text-primary min-h-[32px] flex items-center"
                  >
                    {t('quickLinks.calendar')}
                  </Link>
                </div>
              </div>

              {/* Column 2.1.2: Connect with us */}
              <div className="flex flex-col gap-6 lg:col-span-2">
                <Text
                  as="h3"
                  variant="smallHeading"
                  align="left"
                  className="text-secondary"
                >
                  {t('connect.title')}
                </Text>
                <div className="flex gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                      <Link
                        href="https://instagram.com/uppinghamvietnam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <path
                              d="M8.0599 11.3971C9.90081 11.3971 11.3932 9.90472 11.3932 8.0638C11.3932 6.22285 9.90081 4.73047 8.0599 4.73047C6.21895 4.73047 4.72656 6.22285 4.72656 8.0638C4.72656 9.90472 6.21895 11.3971 8.0599 11.3971Z"
                              stroke="white"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M0.5625 11.3958V4.72917C0.5625 2.42798 2.42798 0.5625 4.72917 0.5625H11.3958C13.697 0.5625 15.5625 2.42798 15.5625 4.72917V11.3958C15.5625 13.697 13.697 15.5625 11.3958 15.5625H4.72917C2.42798 15.5625 0.5625 13.697 0.5625 11.3958Z"
                              stroke="white"
                              strokeWidth="1.125"
                            />
                            <path
                              d="M12.6445 3.49044L12.6544 3.47949"
                              stroke="white"
                              strokeWidth="1.125"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <Text as="span" variant="body" className="text-primary">
                          {t('connect.instagram')}
                        </Text>
                      </Link>
                      <Link
                        href="https://youtube.com/@uppinghamvietnam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <path
                              d="M15.4966 4.41375C15.415 4.08747 15.2487 3.78852 15.0145 3.54709C14.7803 3.30567 14.4865 3.13031 14.1629 3.03875C12.9804 2.75 8.25039 2.75 8.25039 2.75C8.25039 2.75 3.52039 2.75 2.33789 3.06625C2.01425 3.15781 1.7205 3.33317 1.48632 3.57459C1.25214 3.81602 1.08581 4.11497 1.00414 4.44125C0.787728 5.64132 0.681868 6.85871 0.687893 8.07812C0.680179 9.30672 0.786046 10.5334 1.00414 11.7425C1.09418 12.0586 1.26423 12.3462 1.49787 12.5775C1.73151 12.8087 2.02083 12.9757 2.33789 13.0625C3.52039 13.3787 8.25039 13.3787 8.25039 13.3787C8.25039 13.3787 12.9804 13.3787 14.1629 13.0625C14.4865 12.9709 14.7803 12.7956 15.0145 12.5542C15.2487 12.3127 15.415 12.0138 15.4966 11.6875C15.7114 10.4965 15.8172 9.28835 15.8129 8.07812C15.8206 6.84953 15.7147 5.62285 15.4966 4.41375Z"
                              fill="white"
                            />
                            <path
                              d="M6.70312 10.3273L10.6562 8.07918L6.70312 5.83105V10.3273Z"
                              fill="#E13246"
                            />
                          </svg>
                        </div>
                        <Text as="span" variant="body" className="text-primary">
                          {t('connect.youtube')}
                        </Text>
                      </Link>
                      <Link
                        href="https://facebook.com/uppinghamvietnam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5"
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                          >
                            <path
                              d="M7.5 0H5.45455C4.55039 0 3.68325 0.359168 3.04398 0.998502C2.40462 1.63783 2.04545 2.50495 2.04545 3.40909V5.45455H0V8.18182H2.04545V13.6364H4.77273V8.18182H6.81818L7.5 5.45455H4.77273V3.40909C4.77273 3.22826 4.84459 3.05484 4.97243 2.92697C5.10027 2.79911 5.27373 2.72727 5.45455 2.72727H7.5V0Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <Text as="span" variant="body" className="text-primary">
                          {t('connect.facebook')}
                        </Text>
                      </Link>
                    </div>
                  </div>
                  {/* Column 5: Policies */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                      <Link
                        href={`/${locale}/terms`}
                        variant="body"
                        className="text-primary"
                      >
                        {t('policies.terms')}
                      </Link>
                      <Link
                        href={`/${locale}/privacy`}
                        variant="body"
                        className="text-primary"
                      >
                        {t('policies.privacy')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Row 2.2 */}
            {/* Accreditation Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 ">
              <div className="flex items-center justify-center">
                <Image
                  src="/home/oxford.svg"
                  alt="Oxford AQA International Qualifications Approved Centre"
                  width={150}
                  height={80}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/home/century.svg"
                  alt="Century Intelligent Learning"
                  width={150}
                  height={80}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/home/ipq.svg"
                  alt="IPG Gold School / ISEB"
                  width={120}
                  height={80}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/home/isi.svg"
                  alt="ISI Independent Schools Inspectorate"
                  width={120}
                  height={80}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gray Section */}
      <div className="py-[30px] bg-stone border-t border-[#DEDEC9] mt-[75px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-tt-norms text-[18px] font-[450] text-[#C9C9A6]">
            {t('designer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
