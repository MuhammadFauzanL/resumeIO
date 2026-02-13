import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

class SafeMarkdown extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Markdown rendering error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="whitespace-pre-wrap">{this.props.content}</div>;
        }
        return this.props.children;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.content !== this.props.content && this.state.hasError) {
            this.setState({ hasError: false });
        }
    }
}

const MarkdownRenderer = ({ content }) => {
    if (!content) return null;
    return (
        <SafeMarkdown content={content}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 leading-snug">
                {content}
            </ReactMarkdown>
        </SafeMarkdown>
    );
};

const ProfessionalTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, organizations, languages, courses, references, certifications } = data;

    const TightSectionLayout = ({ title, items, renderItem, showTitle = true }) => (
        <section className="mb-3 border-b border-black pb-2 last:border-0 border-opacity-50">
            <div className="flex flex-col">
                <div className="flex gap-4">
                    <div className="w-[140px] shrink-0 text-left">
                        {showTitle && <h2 className="text-sm font-semibold uppercase tracking-widest text-black mb-1">{title}</h2>}
                    </div>
                    <div className="flex-1">
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="w-[140px] shrink-0 text-left text-sm text-black font-medium leading-snug">
                                {renderItem(item).date}
                            </div>

                            <div className="flex-1 -mt-1">
                                {renderItem(item).content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <div className="w-full h-full bg-white p-8 text-black" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            <style>{`
                @media print {
                    @page {
                        margin-top: 35mm;
                        margin-bottom: 20mm;
                    }
                    @page :first {
                        /* First page (Personal Info): Keep closer to top */
                        margin-top: 10mm;
                        margin-bottom: 20mm;
                    }

                    /* Allow sections to break across pages naturally */
                    section {
                        break-inside: auto;
                    }

                    /* Prevent headers from being orphaned at the bottom of a page */
                    h2 {
                        break-after: avoid;
                        page-break-after: avoid;
                    }
                    
                    /* Helper to ensure header container stays together */
                    .section-header {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                }
            `}</style>



            <header className="text-center mb-5 border-b border-black pb-3 border-opacity-50">
                <div className="flex flex-wrap justify-center items-baseline gap-2 mb-2">
                    <h1 className="text-2xl font-normal text-black tracking-wide leading-none">
                        {personalInfo?.firstName} {personalInfo?.lastName}
                    </h1>
                    {personalInfo?.jobTitle && (
                        <span className="text-2xl text-gray-700 font-normal leading-none">
                            | {personalInfo.jobTitle}
                        </span>
                    )}
                </div>

                <div className="flex justify-center items-center flex-wrap gap-1 text-sm text-black">
                    {[
                        personalInfo?.email,
                        personalInfo?.phone,
                        [personalInfo?.city, personalInfo?.country].filter(Boolean).join(', '),
                        personalInfo?.linkedin,
                        personalInfo?.website
                    ].filter(Boolean).map((info, index) => (
                        <span key={index}>
                            {index > 0 && ", "}
                            {info.includes('http') ? <a href={info} target="_blank" rel="noopener noreferrer" className="text-black no-underline hover:text-gray-700">{info}</a> : info}
                        </span>
                    ))}
                </div>
            </header>

            {summary && (
                <section className="mb-3 border-b border-black pb-2 border-opacity-50">
                    <div className="flex gap-4">
                        <div className="w-[140px] shrink-0 text-left">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-black">Profile</h2>
                        </div>
                        <div className="flex-1 text-sm leading-relaxed text-black text-justify -mt-0.5">
                            <MarkdownRenderer content={summary} />
                        </div>
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <TightSectionLayout
                    title="Experience"
                    items={experience}
                    renderItem={(exp) => ({
                        date: <>{exp.startDate} — {exp.endDate || 'Present'}</>,
                        content: (
                            <>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-base font-medium text-black uppercase">{exp.jobTitle}</h3>
                                    <span className="text-sm text-black">{exp.city}</span>
                                </div>
                                <div className="text-sm text-black mb-1">{exp.employer}</div>
                                {exp.description && (
                                    <div className="text-sm text-black leading-snug text-justify">
                                        <MarkdownRenderer content={exp.description} />
                                    </div>
                                )}
                            </>
                        )
                    })}
                />
            )}

            {education && education.length > 0 && (
                <TightSectionLayout
                    title="Education"
                    items={education}
                    renderItem={(edu) => ({
                        date: <>{edu.startDate} — {edu.endDate || 'Present'}</>,
                        content: (
                            <>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-base font-medium text-black uppercase">{edu.degree}</h3>
                                    <span className="text-sm text-black">{edu.city}</span>
                                </div>
                                <div className="text-sm text-black mb-1">{edu.school}</div>
                                {edu.description && (
                                    <div className="text-sm text-black leading-snug text-justify">
                                        <MarkdownRenderer content={edu.description} />
                                    </div>
                                )}
                            </>
                        )
                    })}
                />
            )}

            {organizations && organizations.length > 0 && (
                <TightSectionLayout
                    title="Organizations"
                    items={organizations}
                    renderItem={(org) => ({
                        date: <>{org.startDate} — {org.endDate || 'Present'}</>,
                        content: (
                            <>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-base font-medium text-black uppercase">{org.role}</h3>
                                    <span className="text-sm text-black">{org.city}</span>
                                </div>
                                <div className="text-sm text-black mb-1">{org.organization}</div>
                                {org.description && (
                                    <div className="text-sm text-black leading-snug text-justify">
                                        <MarkdownRenderer content={org.description} />
                                    </div>
                                )}
                            </>
                        )
                    })}
                />
            )}

            {certifications && certifications.length > 0 && (
                <TightSectionLayout
                    title="Certifications"
                    items={certifications}
                    renderItem={(cert) => ({
                        date: <>{cert.date}</>,
                        content: (
                            <>
                                <h3 className="text-base font-medium text-black uppercase mb-0.5">{cert.name}</h3>
                                <div className="text-sm text-black mb-1">{cert.issuer}</div>
                                {cert.description && (
                                    <div className="text-sm text-black leading-snug text-justify">
                                        <MarkdownRenderer content={cert.description} />
                                    </div>
                                )}
                            </>
                        )
                    })}
                />
            )}

            {references && references.length > 0 && (
                <section className="mb-3 border-b border-black pb-2 border-opacity-50">
                    <div className="flex gap-4">
                        <div className="w-[140px] shrink-0 text-left">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-black">References</h2>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-6">
                            {references.map((ref, index) => (
                                <div key={index} className="text-sm text-black">
                                    <div className="font-semibold text-base">{ref.name}</div>
                                    <div className="text-black">{ref.company}</div>
                                    <div className="text-black mt-1">{ref.email}</div>
                                    <div className="text-black">{ref.phone}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section className="mb-3 border-b border-black pb-2 border-opacity-50">
                    <div className="flex gap-4">
                        <div className="w-[140px] shrink-0 text-left">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-black">Skills</h2>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1">
                            {skills.map((skill, index) => (
                                <div key={index} className="text-sm text-black">
                                    <span className="font-semibold">{skill.name}</span>
                                    {skill.level && <span className="text-black ml-1">({skill.level})</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {languages && languages.length > 0 && (
                <section className="mb-3 border-b border-black pb-2 border-opacity-50">
                    <div className="flex gap-4">
                        <div className="w-[140px] shrink-0 text-left">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-black">Languages</h2>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            {languages.map((lang, index) => (
                                <div key={index} className="text-sm text-black flex justify-between border-b border-gray-100 pb-1">
                                    <span className="font-semibold">{lang.language}</span>
                                    <span className="text-black">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {courses && courses.length > 0 && (
                <TightSectionLayout
                    title="Courses"
                    items={courses}
                    renderItem={(course) => ({
                        date: <>{course.startDate} — {course.endDate}</>,
                        content: (
                            <>
                                <div className="font-semibold text-black">{course.name}</div>
                                <div className="text-black">{course.institution}</div>
                            </>
                        )
                    })}
                />
            )}

        </div>
    );
};

export default ProfessionalTemplate;
