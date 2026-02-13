import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ModernTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, themeColor } = data;

    return (
        <div className="w-full h-full bg-white p-8 font-sans text-gray-800 relative">
            <header className="mb-6 border-b-2 pb-6" style={{ borderColor: themeColor || '#007BFF' }}>
                <h1 className="text-4xl font-bold tracking-wide text-gray-900">
                    {personalInfo?.firstName} <span style={{ color: themeColor || '#007BFF' }}>{personalInfo?.lastName}</span>
                </h1>
                <p className="text-xl font-medium text-gray-600 mt-1">{personalInfo?.jobTitle}</p>

                <div className="flex flex-wrap mt-2 text-sm text-gray-600 gap-x-4 gap-y-1">
                    {personalInfo?.email && (
                        <span>{personalInfo.email}</span>
                    )}
                    {personalInfo?.phone && (
                        <span>{personalInfo.phone}</span>
                    )}
                    {personalInfo?.city && (
                        <span>{personalInfo.city}{personalInfo.country ? `, ${personalInfo.country}` : ''}</span>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-6">
                    {summary && (
                        <section>
                            <h2 className="text-lg uppercase tracking-wider mb-2" style={{ color: themeColor || '#007BFF' }}>Profile</h2>
                            <div className="text-gray-700 leading-relaxed text-sm pl-4">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{summary}</ReactMarkdown>
                            </div>
                        </section>
                    )}

                    {experience && experience.length > 0 && (
                        <section>
                            <h2 className="text-lg uppercase tracking-wider mb-4 border-b-2 inline-block pb-1" style={{ color: themeColor || '#007BFF', borderColor: themeColor || '#007BFF' }}>Employment History</h2>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4">
                                        <div className="sm:w-1/4 flex-shrink-0">
                                            <div className="text-sm font-semibold text-gray-600">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </div>
                                        </div>
                                        <div className="sm:w-3/4">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-gray-800 text-lg">{exp.jobTitle}</h3>
                                                <span className="text-sm text-gray-500">{exp.city}</span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-700 mb-2">{exp.employer}</div>
                                            <div className="text-sm text-gray-700 leading-relaxed pl-0">
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-sm max-w-none">
                                                    {exp.description}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-lg uppercase tracking-wider mb-4 border-b-2 inline-block pb-1" style={{ color: themeColor || '#007BFF', borderColor: themeColor || '#007BFF' }}>Education</h2>
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4">
                                        <div className="sm:w-1/4 flex-shrink-0">
                                            <div className="text-sm font-semibold text-gray-600">
                                                {edu.startDate} - {edu.endDate || 'Present'}
                                            </div>
                                        </div>
                                        <div className="sm:w-3/4">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-gray-800 text-lg">{edu.degree}</h3>
                                                <span className="text-sm text-gray-500">{edu.city}</span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-700 mb-2">{edu.school}</div>
                                            <div className="text-sm text-gray-700 leading-relaxed pl-0">
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-sm max-w-none">
                                                    {edu.description}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-4 space-y-6">
                    {personalInfo?.linkedin || personalInfo?.website ? (
                        <section>
                            <h2 className="text-lg uppercase tracking-wider mb-3" style={{ color: themeColor || '#007BFF' }}>Links</h2>
                            <div className="space-y-2 text-sm text-gray-700 pl-4">
                                {personalInfo.linkedin && (
                                    <div className="flex items-center">
                                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                                    </div>
                                )}
                                {personalInfo.website && (
                                    <div className="flex items-center">
                                        <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : null}

                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-lg uppercase tracking-wider mb-3" style={{ color: themeColor || '#007BFF' }}>Skills</h2>
                            <div className="flex flex-col space-y-2 pl-4">
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <div className="text-sm font-medium text-gray-700">{skill.name}</div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div
                                                className="h-1.5 rounded-full"
                                                style={{
                                                    width: skill.level === 'Expert' ? '100%' : skill.level === 'Intermediate' ? '66%' : '33%',
                                                    backgroundColor: themeColor || '#007BFF'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
