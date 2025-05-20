'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/common/layout/Header';
import { Sidebar } from '@/components/common/layout/Sidebar';
import { getUser } from '@/services/auth-requests';
import { getCookie } from '@/app/actions';
import axios from 'axios';
import { config } from '@/utils/config';

export default function Archives() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [archives, setArchives] = useState<Record<string, any>[]>([]);
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArchive, setSelectedArchive] = useState<Record<string, any> | null>(null);
  const [meetingTime, setMeetingTime] = useState<string>('');
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchArchives = async () => {
    try {
      const userData = await getUser();
      setUser(userData.response);

      const token = await getCookie('jwt_token');
      const response = await axios.get(
        `${config.BASE_API_URL}/job-applications/archives`,
        { headers: { Authorization: `Bearer ${token?.value}` } }
      );

      console.log(response);
      setArchives(response.data);
    } catch (err: any) {
      const errorMessage = Array.isArray(err?.response?.data?.message) ? err.response.data.message[0] : err.response.data.message;
      setError(errorMessage || 'Failed to fetch archives');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const openModal = (app: Record<string, any>) => {
    setSelectedArchive(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMeetingTime('');
    setMeetingLink('');
    setSelectedArchive(null);
  };

  const handleReacceptance = async () => {
    if (!selectedArchive) return;
    try {
      const token = await getCookie('jwt_token');
      await axios.put(
        `${config.BASE_API_URL}/job-applications/archives/${selectedArchive._id}`,
        { isArchived: false },
        { headers: { Authorization: `Bearer ${token?.value}` } }
      );
      alert('Application reaccepted');
      closeModal();
      fetchArchives();
    } catch (err: any) {
      const errorMessage = Array.isArray(err?.response?.data?.message) ? err.response.data.message[0] : err.response.data.message;
      alert(errorMessage || 'Failed to re-accept application');
    }
  };

  if (isLoading) return (<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-800 border-b-transparent"></div></div>);
  if (error) return (<div className="text-red-500 text-center p-4">{error}</div>);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar type="employer" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Header username={user?.companyName} onMenuClick={() => setIsSidebarOpen(true)} />

      <main className="pt-16 p-4 md:p-6 md:ml-64 md:mt-[60px] mt-[30px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-base md:text-lg font-semibold mb-4">Archives</h1>
          {archives.length === 0 ? (
            <div className="text-center text-gray-500 p-4">No archives found.</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-6 text-xs md:text-sm font-semibold text-gray-600 px-4 py-2 border-b">
                <div className="col-span-2">Job</div>
                <div className="col-span-1">Location</div>
                <div className="col-span-1">Employment Type</div>
                <div className="col-span-1">Cover Letter</div>
                <div className="col-span-1">Action</div>
              </div>
              {archives.map(archive => (
                <div key={archive._id} className="bg-white border rounded-lg p-4 grid grid-cols-6 items-center gap-2 hover:bg-gray-50 transition">
                  <div className="col-span-2"><h3 className="font-semibold text-xs md:text-sm">{archive.jobId.title}</h3></div>
                  <div className="col-span-1"><h3 className="text-xs md:text-sm">{archive.jobId.location}</h3></div>
                  <div className="col-span-1"><h3 className="text-xs md:text-sm capitalize">{archive.jobId.employmentType}</h3></div>
                  <div className="col-span-1"><h3 className="text-xs md:text-sm truncate">{archive.coverLetter}</h3></div>
                  <div className="col-span-1">
                    <button
                      onClick={() => openModal(archive)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedArchive && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Application Details</h2>
              <p><strong>Applicant:</strong> {selectedArchive.applicantId.fullName}</p>
              <p><strong>Email:</strong> {selectedArchive.applicantId.email}</p>
              <p className="mt-2"><strong>Cover Letter:</strong></p>
              <p className="mb-4 text-sm">{selectedArchive.coverLetter}</p>
              <a
                href={selectedArchive.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mb-4 block cursor-pointer"
              >
                View Resume
              </a>

              <div className="mt-6 flex justify-end space-x-2">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleReacceptance} className="px-4 py-2 bg-blue-600 text-white rounded">Re-accept</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
