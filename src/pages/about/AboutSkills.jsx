const AboutSkills = () => {
    return (
        <section className="card">
            <h2>Skills</h2>

            <p>
                My experience spans several decades, so not all technologies listed here are things I use every day.
                To keep this honest and useful, skills are grouped by current focus and historical experience.
            </p>

            <h3>Current &amp; Active</h3>
            <ul>
                <li>C, C++, C#, Java</li>
                <li>JavaScript / React</li>
                <li>Python</li>
                <li>PowerShell</li>
                <li>VBScript</li>
                <li>Automation design: repeatable workflows, testability, regression validation</li>
                <li>VMware Workstation and virtualized test environments</li>
                <li>Windows systems engineering and troubleshooting</li>
            </ul>

            <h3>Experienced / Not Recent</h3>
            <ul>
                <li>Perl, AutoIT</li>
                <li>Enterprise deployment scripting and tooling</li>
                <li>TCP/IP networking diagnostics, LAN/WAN troubleshooting</li>
                <li>DNS, DHCP, file and print services</li>
                <li>EggPlant automation and framework extension</li>
            </ul>

            <h3>Foundational / Historical</h3>
            <ul>
                <li>Ruby, Pascal, Ada, FORTRAN, COBOL</li>
                <li>UNIX, VMS, IBM OS/VS2 MVS</li>
                <li>Embedded and hardware-facing diagnostics (early career)</li>
            </ul>

        </section>
    )
};

export default AboutSkills;
