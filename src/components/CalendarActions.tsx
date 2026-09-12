import React, { useState } from "react";
import { Calendar, Download, Copy, Check, MapPin } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const CalendarActions: React.FC = () => {
  const [copiedChurch, setCopiedChurch] = useState(false);
  const [copiedReception, setCopiedReception] = useState(false);

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Wedding of ${weddingData.couple.groom} & ${weddingData.couple.bride}`);
    const details = encodeURIComponent(
      `Sacred Christian Nuptial Ceremony at ${weddingData.wedding.venue} (10:00 AM) followed by Wedding Reception at ${weddingData.reception.venue} (12:30 PM).`
    );
    const location = encodeURIComponent(`${weddingData.wedding.venue}, ${weddingData.wedding.location}`);
    // 23 Nov 2026 10:00 AM IST is 04:30 AM UTC; End at 3:00 PM IST (09:30 UTC)
    const dates = "20261123T043000Z/20261123T093000Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate & download .ics file for Apple / Outlook
  const downloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Augustine and Jennifer Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:Wedding of Augustine & Jennifer",
      "DESCRIPTION:Sacred Christian Nuptial Ceremony at St. Mary's Orthodox Church Vandiperiyar followed by Wedding Reception at Santhom Auditorium Kumily.",
      "LOCATION:St. Mary's Orthodox Church, Vandiperiyar, Idukki, Kerala",
      "DTSTART:20261123T043000Z",
      "DTEND:20261123T093000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Augustine-Jennifer-Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string, type: "church" | "reception") => {
    navigator.clipboard.writeText(text);
    if (type === "church") {
      setCopiedChurch(true);
      setTimeout(() => setCopiedChurch(false), 2500);
    } else {
      setCopiedReception(true);
      setTimeout(() => setCopiedReception(false), 2500);
    }
  };

  return (
    <div className="my-10 max-w-4xl mx-auto px-4">
      <div className="paper-card p-6 sm:p-8 rounded-2xl border border-[#C5A059]/40 shadow-lg bg-[#FDFBF7] text-center">
        <p className="text-xs tracking-[0.25em] text-[#C5A059] uppercase font-semibold mb-2">
          Save The Date In Your Calendar
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#3A2E2B] font-medium mb-6">
          Never Miss A Sacred Moment
        </h3>

        {/* Action Button Strip */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {/* Google Calendar Link */}
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3A2E2B] text-white hover:bg-[#C5A059] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Add to Google Calendar</span>
          </a>

          {/* Download iCal / Outlook */}
          <button
            onClick={downloadICS}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-[#3A2E2B] hover:bg-[#FAF5EE] text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5A059]" />
            <span>Download Apple / Outlook (.ics)</span>
          </button>
        </div>

        {/* Quick Address Copy Utilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-6 pt-6 border-t border-[#C5A059]/20">
          <button
            onClick={() =>
              copyToClipboard(
                `${weddingData.wedding.venue}, ${weddingData.wedding.location}`,
                "church"
              )
            }
            className="flex items-center justify-between p-3 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 text-xs text-[#3A2E2B] hover:border-[#C5A059] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="truncate">Copy Church Address</span>
            </span>
            {copiedChurch ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#5C534E] shrink-0" />
            )}
          </button>

          <button
            onClick={() =>
              copyToClipboard(
                `${weddingData.reception.venue}, ${weddingData.reception.location}`,
                "reception"
              )
            }
            className="flex items-center justify-between p-3 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 text-xs text-[#3A2E2B] hover:border-[#C5A059] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span className="truncate">Copy Reception Address</span>
            </span>
            {copiedReception ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#5C534E] shrink-0" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
