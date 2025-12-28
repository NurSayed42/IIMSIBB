// src/components/common/QuickActions.js
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = ({ actions }) => {
  const getIcon = (iconName) => {
    const icons = {
      'user-add': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      'users': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      'clipboard-list': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    };
    return icons[iconName] || icons['users'];
  };

  const getColorClasses = (color) => {
    const colors = {
      'green': 'bg-green-500 hover:bg-green-600',
      'blue': 'bg-blue-500 hover:bg-blue-600',
      'purple': 'bg-purple-500 hover:bg-purple-600'
    };
    return colors[color] || colors['blue'];
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.link}
          className={`${getColorClasses(action.color)} rounded-lg shadow-md transition-colors duration-200 transform hover:scale-105`}
        >
          <div className="p-6 text-white">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {getIcon(action.icon)}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">{action.title}</h3>
                <p className="mt-1 text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;