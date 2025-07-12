import React from 'react';
import { 
  HomeIcon, 
  QuestionMarkCircleIcon, 
  TagIcon, 
  UserIcon,
  ChartBarIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/app', icon: HomeIcon, current: true },
  { name: 'Ask Question', href: '/app/ask', icon: QuestionMarkCircleIcon, current: false },
  { name: 'Tags', href: '/app/tags', icon: TagIcon, current: false },
  { name: 'Profile', href: '/app/profile', icon: UserIcon, current: false },
  { name: 'Saved', href: '/app/saved', icon: BookmarkIcon, current: false },
  { name: 'Statistics', href: '/app/stats', icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">StackIt</h2>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-50 text-black'
                          : 'text-gray-700 hover:text-black hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-black' : 'text-gray-400 group-hover:text-black',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Community Stats</h3>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Questions</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answers</span>
                    <span className="font-medium">5,678</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Users</span>
                    <span className="font-medium">890</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}