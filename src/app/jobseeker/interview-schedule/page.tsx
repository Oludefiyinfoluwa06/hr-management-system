'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '@/app/actions';
import { getUser } from '@/services/auth-requests';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { config } from '@/utils/config';

export default function InterviewSchedule() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [schedules, setSchedules] = useState<Record<string, any>[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { response: userData } = await getUser();
        setUser(userData);
        const token = await getCookie('jwt_token');
        const { data } = await axios.get(
          `${config.BASE_API_URL}/job-applications/schedule`,
          { headers: { Authorization: `Bearer ${token?.value}` } }
        );
        setSchedules(data);
      } catch (err) {
        console.error(err);
        setError('Could not load interview schedules.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-2 border-black-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar type="jobseeker" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header username={user?.userName} onMenuClick={() => setIsSidebarOpen(true)} />
      <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Scheduled Interviews</h1>
          {schedules.length === 0 ? (
            <div className="text-center text-gray-500">No interviews scheduled.</div>
          ) : (
            <ul className="space-y-4">
              {schedules.map(sch => (
                <li key={sch._id} className="bg-white shadow rounded-lg p-4">
                  <h2 className="text-xl font-medium">{sch.applicationId.jobId.title}</h2>
                  <p className="text-sm text-gray-600">
                    {sch.applicationId.jobId.companyName} — {sch.applicationId.jobId.location} — {sch.applicationId.jobId.employmentType}
                  </p>
                  <p className="mt-2">
                    <strong>When:</strong> {new Date(sch.meetingTime).toLocaleString()}
                  </p>
                  <p className="mt-1">
                    <strong>Link:</strong>{' '}
                    <a
                      href={sch.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Join Meeting
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
