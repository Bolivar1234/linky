'use client';

import styles from './marketing-navigation.module.css';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import { Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@trylinky/ui';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function MarketingNavigation({ children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <header className="fixed top-4 w-full z-10">
        <div className="max-w-xl mx-auto px-4">
          <nav
            className={cn(
              'flex items-center justify-between gap-x-6 rounded-full bg-white backdrop-blur-sm py-2 px-3',
              styles.navigation
            )}
          >
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <svg viewBox="0 0 321 321" width={20} height={20} fill="none">
                  <path
                    fill="#000"
                    d="M274.378 238.093c-5.317-1.294-9.643-2.294-15.133-.863 4.97 10.285 16.184 15.791 19.854 27.397-6.04 4.376-11.93 9.021-18.212 13.056-3.82 2.453-7.051-.443-9.629-2.957-16.22-15.814-32.313-31.76-48.464-47.645-4.872-4.793-3.234-8.289.77-13.301 9.452-11.834 19.807-16.768 35.501-12.938 20.746 5.063 42.184 7.223 63.11 11.646 12.161 2.57 12.144 5.498 4.462 15.158-8.402 10.564-18.83 13.018-32.259 10.447Z"
                  />
                </svg>
                <span className="font-bold text-sm">Linky</span>
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-end gap-x-1">
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link href="/i/pricing">Pricing</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden sm:flex">
                    Resources <ChevronDownIcon className="w-5 h-5 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-96 rounded-2xl">
                  <DropdownMenuItem asChild className="items-start rounded-2xl">
                    <Link
                      href="/i/explore"
                      className="grid grid-cols-[40px_1fr] items-start"
                    >
                      <PhotoIcon className="w-5 h-5 mt-1" />
                      <div className="flex flex-col">
                        <span className="text-base font-semibold font-serf">
                          Explore
                        </span>
                        <span className="text-sm text-black/60">
                          Some of the best link-in-bio pages created by the
                          Givee community.
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="items-start rounded-2xl">
                    <Link
                      href="/i/blog"
                      className="grid grid-cols-[40px_1fr] items-start"
                    >
                      <BookOpenIcon className="w-5 h-5 mt-1" />
                      <div className="flex flex-col">
                        <span className="text-base font-semibold font-serf">
                          Blog
                        </span>
                        <span className="text-sm text-black/60">
                          Product updates, tutorials, and other helpful content
                          from the Givee team.
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="items-start rounded-2xl">
                    <Link
                      href="/i/learn"
                      className="grid grid-cols-[40px_1fr] items-start"
                    >
                      <AcademicCapIcon className="w-5 h-5 mt-1" />
                      <div className="flex flex-col">
                        <span className="text-base font-semibold font-serf">
                          Learn
                        </span>
                        <span className="text-sm text-black/60">
                          Common questions and answers about Givee and
                          link-in-bio.
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isLoggedIn ? (
                <Button asChild variant="ghost" className="hidden sm:flex">
                  <Link href="/edit">Dashboard →</Link>
                </Button>
              ) : (
                children
              )}
              <button
                type="button"
                className="-m-2.5 inline-flex sm:hidden items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center gap-x-3">
              <Link
                href="/"
                className="-m-1.5 p-1.5 flex items-center gap-2 flex-1"
              >
                <svg viewBox="0 0 321 321" width={20} height={20} fill="none">
                  <path
                    fill="#000"
                    d="M274.378 238.093c-5.317-1.294-9.643-2.294-15.133-.863 4.97 10.285 16.184 15.791 19.854 27.397-6.04 4.376-11.93 9.021-18.212 13.056-3.82 2.453-7.051-.443-9.629-2.957-16.22-15.814-32.313-31.76-48.464-47.645-4.872-4.793-3.234-8.289.77-13.301 9.452-11.834 19.807-16.768 35.501-12.938 20.746 5.063 42.184 7.223 63.11 11.646 12.161 2.57 12.144 5.498 4.462 15.158-8.402 10.564-18.83 13.018-32.259 10.447Z"
                  />
                </svg>
                <span className="font-medium">Linky</span>
              </Link>
              {children}
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 flex flex-col gap-2">
                  <Link
                    href="/i/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/i/explore"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Explore
                  </Link>
                  <Link
                    href="/i/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/i/learn"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Learn
                  </Link>
                  <Link
                    href="https://x.com/trylinky"
                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Twitter / X
                  </Link>
                  <Link
                    href="https://github.com/trylinky/linky"
                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    View Source on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}