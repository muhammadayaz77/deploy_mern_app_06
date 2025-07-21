import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useGetResult from '../../../custom-hooks/useGetResult';
import { useSelector } from 'react-redux';

const Result = () => {
  const [expandedSessions, setExpandedSessions] = useState({});

  useGetResult();
  let data = useSelector(store => store.result.result);

  const toggleSession = (year) => {
    setExpandedSessions(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Academic Performance</h2>
      
      <div className="space-y-4">
        {data?.map((session) => (
          <div 
            key={session._id} 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300"
          >
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleSession(session._id)}
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-700">{session.year}</h3>
                {session.classes[0]?.className && (
                  <p className="text-sm text-gray-500 mt-1">
                    Class: {session.classes[0].className}
                  </p>
                )}
              </div>
              {expandedSessions[session._id] ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSessions[session._id] ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
              <div className="p-4 border-t">
                {session.classes.map((classItem, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    {classItem.className && (
                      <h4 className="font-medium text-gray-700 mb-3">
                        {classItem.className} - Subjects
                      </h4>
                    )}
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {classItem.subjects.map((subject, subIndex) => (
                        <div 
                          key={subIndex} 
                          className="bg-white p-4 rounded-lg border border-gray-100 shadow-xs"
                        >
                          <h5 className="font-medium text-gray-800 mb-2">{subject.subject}</h5>
                          
                          <div className="space-y-3">
                            <div>
                              <h6 className="text-sm font-medium text-gray-600 mb-1">Assignments</h6>
                              <div className="flex justify-between flex-wrap text-sm">
                                <span>ASG 1: {subject.assignments.asg1}</span>
                                <span>ASG 2: {subject.assignments.asg2}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h6 className="text-sm font-medium text-gray-600 mb-1">Quizzes</h6>
                              <div className="flex justify-between flex-wrap text-sm">
                                <span>Quiz 1: {subject.quizzes.quiz1}</span>
                                <span>Quiz 2: {subject.quizzes.quiz2}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h6 className="text-sm font-medium text-gray-600 mb-1">Exams</h6>
                              <div className="flex justify-between flex-wrap text-sm">
                                <span>Mid: {subject.exams.mid}</span>
                                <span>Final: {subject.exams.final}</span>
                              </div>
                            </div>
                            
                            {'total' in subject && (
                              <div className="pt-2 border-t mt-2">
                                <p className="text-sm font-medium">
                                  Total: <span className="text-blue-600">{subject.total}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;