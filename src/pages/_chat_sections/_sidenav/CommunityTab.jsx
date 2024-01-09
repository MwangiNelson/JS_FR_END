import React from 'react'

const CommunityTab = () => {
  return (
    <div className="relative w-full overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 h-[55vh]">
      <ul className="w-full flex flex-col">
        <li class="py-3 px-3 sm:py-4 w-full border-b-2">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-12 h-12 rounded-full" src="/images/abstract.png" alt="Neil image" />
            </div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                The Recovery Group
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                About : Welcome and let's go through this journey together
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <span className="flex flex-col items-end text-xs">
                <span>01</span>
                MEMBERS
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default CommunityTab