"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  DATA_SOURCES,
  TECHNICAL_ACCOUNTS,
  DataSourceItem,
  TechnicalAccountItem,
} from "@/data/adminData";

export default function KelolaSumberAkunPage() {
  const [activeTab, setActiveTab] = useState<"sources" | "accounts">("sources");

  // Sources management
  const [sourcesList, setSourcesList] = useState<DataSourceItem[]>(DATA_SOURCES);
  const [revealedApiKeyId, setRevealedApiKeyId] = useState<string | null>(null);
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [testingPingId, setTestingPingId] = useState<string | null>(null);

  // Accounts management
  const [accountsList, setAccountsList] = useState<TechnicalAccountItem[]>(TECHNICAL_ACCOUNTS);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [revealedAccountId, setRevealedAccountId] = useState<string | null>(null);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New source form state
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceType, setNewSourceType] = useState<DataSourceItem["faskesType"]>("RS Tipe C");
  const [newSourceEndpoint, setNewSourceEndpoint] = useState("");
  const [newSourceProtocol, setNewSourceProtocol] = useState<DataSourceItem["protocol"]>("FHIR SATUSEHAT");

  // New account form state
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountFaskes, setNewAccountFaskes] = useState("");
  const [newAccountEmail, setNewAccountEmail] = useState("");
  const [newAccountRole, setNewAccountRole] = useState<TechnicalAccountItem["role"]>("Teknisi SIMRS RS");

  const handleTestPing = (id: string, name: string) => {
    setTestingPingId(id);
    setTimeout(() => {
      setTestingPingId(null);
      setToastMessage(`Ping ke gateway ${name} berhasil! Respon: 200 OK (115ms).`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 900);
  };

  const handleToggleAccountStatus = (id: string) => {
    setAccountsList((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? {
              ...acc,
              status: acc.status === "active" ? "suspended" : "active",
            }
          : acc
      )
    );
    setToastMessage("Status akun teknis berhasil diperbarui!");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddSourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName || !newSourceEndpoint) return;

    const newSource: DataSourceItem = {
      id: `ds-${Date.now()}`,
      name: newSourceName,
      shortName: newSourceName.split(" ")[0] || "RS",
      faskesType: newSourceType,
      endpoint: newSourceEndpoint,
      protocol: newSourceProtocol,
      status: "success",
      lastSync: "Baru saja terhubung",
      lastSyncExact: "16 Okt 2026 01:39:00 WIB",
      syncFrequency: "Tiap 15 Menit",
      recordsSynced: 120,
      responseTimeMs: 190,
      successRate: 100,
      apiKeyPreview: "by_live_new_" + Math.random().toString(36).substring(7),
      ipWhitelist: "103.111.45.0/24",
      dataModules: ["Kamar SIRANAP", "Jadwal Dokter"],
    };

    setSourcesList((prev) => [newSource, ...prev]);
    setIsAddSourceModalOpen(false);
    setNewSourceName("");
    setNewSourceEndpoint("");
    setToastMessage(`Sumber data ${newSourceName} berhasil ditambahkan dan siap disinkronkan!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName || !newAccountEmail) return;

    const newAcc: TechnicalAccountItem = {
      id: `acc-${Date.now()}`,
      name: newAccountName,
      faskesName: newAccountFaskes || "RS Mitra Banyumas",
      role: newAccountRole,
      email: newAccountEmail,
      clientId: `client_${newAccountEmail.split("@")[0]}`,
      apiKeyMasked: "by_live_gen_" + Math.random().toString(36).substring(4),
      rateLimit: "1000 req/min",
      status: "active",
      lastActive: "Belum pernah",
      createdDate: "16 Okt 2026",
    };

    setAccountsList((prev) => [newAcc, ...prev]);
    setIsAddAccountModalOpen(false);
    setNewAccountName("");
    setNewAccountEmail("");
    setNewAccountFaskes("");
    setToastMessage(`Kredensial teknis untuk ${newAccountName} berhasil diterbitkan!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slideUp font-mono text-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Icon name="check_circle" size={20} />
          </div>
          <div>
            <p className="text-sm font-bold font-sans">Konfigurasi Disimpan</p>
            <p className="text-xs text-slate-300 font-sans">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1 font-semibold">
            <Link href="/admin" className="hover:underline">
              Konsol Admin Sistem
            </Link>
            <span>/</span>
            <span className="text-outline">Kelola Sumber &amp; Akun</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">
            Manajemen Sumber Data &amp; Kredensial API
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Kelola endpoint data hub rumah sakit, integrasi protokol FHIR SatuSehat, API Key, serta hak akses teknisi SIMRS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "sources" ? (
            <button
              type="button"
              onClick={() => setIsAddSourceModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Icon name="add" size={16} />
              <span>Tambah Sumber Data Baru</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddAccountModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Icon name="person_add" size={16} />
              <span>Terbitkan Kredensial Akun</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("sources")}
          className={`pb-3 px-4 font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "sources"
              ? "border-primary text-primary"
              : "border-transparent text-outline hover:text-on-surface"
          }`}
        >
          <Icon name="hub" size={18} />
          <span>Sumber Data &amp; Endpoint ({sourcesList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("accounts")}
          className={`pb-3 px-4 font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "accounts"
              ? "border-primary text-primary"
              : "border-transparent text-outline hover:text-on-surface"
          }`}
        >
          <Icon name="manage_accounts" size={18} />
          <span>Akun Teknis &amp; Token ({accountsList.length})</span>
        </button>
      </div>

      {/* TAB 1: SUMBER DATA & ENDPOINT */}
      {activeTab === "sources" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourcesList.map((source) => (
              <Card
                key={source.id}
                elevation={1}
                rounded="2xl"
                className="p-5 hover:border-primary/40 transition-all flex flex-col justify-between font-mono"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-primary font-bold block w-fit mb-1 border border-slate-200">
                        {source.faskesType}
                      </span>
                      <h3 className="font-bold text-on-surface text-sm leading-snug">
                        {source.name}
                      </h3>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        source.status === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : source.status === "failed"
                          ? "bg-rose-50 text-error border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {source.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Endpoint & Protocol Details */}
                  <div className="space-y-2 text-xs text-on-surface-variant bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3">
                    <div>
                      <span className="text-[10px] text-outline block uppercase font-bold">Base URL Endpoint</span>
                      <span className="text-on-surface text-[11px] break-all block font-semibold">
                        {source.endpoint}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span>Protokol: <b className="text-on-surface">{source.protocol}</b></span>
                      <span>Rate: <b className="text-on-surface">1000/m</b></span>
                    </div>

                    <div>
                      <span className="text-[10px] text-outline block uppercase font-bold">API Key Token</span>
                      <div className="flex items-center justify-between">
                        <code className="text-primary text-[11px] font-bold">
                          {revealedApiKeyId === source.id
                            ? `${source.apiKeyPreview.replace("...", "98fe11b")}`
                            : source.apiKeyPreview}
                        </code>
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedApiKeyId(
                              revealedApiKeyId === source.id ? null : source.id
                            )
                          }
                          className="text-[10px] text-outline hover:text-primary cursor-pointer font-bold"
                        >
                          {revealedApiKeyId === source.id ? "Sembunyikan" : "Perlihatkan"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active modules */}
                  <div>
                    <span className="text-[10px] text-outline block uppercase mb-1 font-bold">
                      Modul Integrasi Aktif:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {source.dataModules.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant border border-slate-200/60"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-outline">
                    IP: {source.ipWhitelist}
                  </span>

                  <button
                    type="button"
                    disabled={testingPingId === source.id}
                    onClick={() => handleTestPing(source.id, source.shortName)}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50 border border-slate-200"
                  >
                    <Icon
                      name="network_ping"
                      size={14}
                      className={testingPingId === source.id ? "animate-spin text-primary" : ""}
                    />
                    <span>{testingPingId === source.id ? "Ping..." : "Test Ping"}</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AKUN TEKNIS & TOKEN */}
      {activeTab === "accounts" && (
        <Card elevation={2} rounded="2xl" className="overflow-hidden font-mono text-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="key" size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-on-surface">
                Daftar Kredensial &amp; Akun Teknis Pengembang SIMRS
              </h2>
            </div>
            <span className="text-outline text-xs">
              Maksimum kuota: 5.000 req/menit
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nama Teknisi &amp; Instansi</th>
                  <th className="py-3 px-4">Peran Hak Akses</th>
                  <th className="py-3 px-4">Client ID &amp; Token</th>
                  <th className="py-3 px-4">Rate Limit &amp; Uptime</th>
                  <th className="py-3 px-4">Status Akun</th>
                  <th className="py-3 px-4 text-right">Kelola</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-on-surface">
                {accountsList.map((acc) => (
                  <tr key={acc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-bold text-on-surface block">{acc.name}</span>
                        <span className="text-on-surface-variant text-[11px] block">{acc.faskesName}</span>
                        <span className="text-outline text-[10px]">{acc.email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold block w-fit">
                        {acc.role}
                      </span>
                      <span className="text-[10px] text-outline mt-1 block">
                        Dibuat: {acc.createdDate}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div>
                        <span className="text-[10px] text-outline block uppercase font-bold">Client ID</span>
                        <code className="text-on-surface text-[11px] font-semibold">{acc.clientId}</code>
                      </div>
                      <div className="mt-1">
                        <span className="text-[10px] text-outline block uppercase font-bold">Bearer Token</span>
                        <code className="text-primary text-[11px] font-bold">
                          {revealedAccountId === acc.id
                            ? acc.apiKeyMasked.replace("...", "789ac22")
                            : acc.apiKeyMasked}
                        </code>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-on-surface font-bold block">{acc.rateLimit}</span>
                      <span className="text-[10px] text-outline block mt-0.5">
                        Aktif: {acc.lastActive}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      {acc.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-error text-xs font-bold">
                          <span className="w-2 h-2 rounded-full bg-error" />
                          Suspended
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedAccountId(
                              revealedAccountId === acc.id ? null : acc.id
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-on-surface text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          {revealedAccountId === acc.id ? "Tutup" : "Token"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleAccountStatus(acc.id)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                            acc.status === "active"
                              ? "bg-rose-50 text-error hover:bg-rose-100 border border-rose-200"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                          }`}
                        >
                          {acc.status === "active" ? "Suspend" : "Aktifkan"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* MODAL: TAMBAH SUMBER DATA BARU */}
      <Modal
        isOpen={isAddSourceModalOpen}
        onClose={() => setIsAddSourceModalOpen(false)}
        title="Registrasi Sumber Data Faskes Baru"
        size="md"
      >
        <form onSubmit={handleAddSourceSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Nama Fasilitas Pelayanan Kesehatan:
            </label>
            <input
              type="text"
              required
              value={newSourceName}
              onChange={(e) => setNewSourceName(e.target.value)}
              placeholder="Contoh: RS Jatiwinangun Purwokerto"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Klasifikasi Faskes:
              </label>
              <select
                value={newSourceType}
                onChange={(e) => setNewSourceType(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
              >
                <option value="RS Tipe A">RS Tipe A</option>
                <option value="RS Tipe B">RS Tipe B</option>
                <option value="RS Tipe C">RS Tipe C</option>
                <option value="RS Khusus">RS Khusus</option>
                <option value="BDRS PMI">BDRS PMI</option>
                <option value="Puskesmas">Puskesmas</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Protokol Integrasi:
              </label>
              <select
                value={newSourceProtocol}
                onChange={(e) => setNewSourceProtocol(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
              >
                <option value="FHIR SATUSEHAT">FHIR SATUSEHAT</option>
                <option value="REST API">REST API JSON</option>
                <option value="HL7 v2">HL7 v2 Message</option>
                <option value="Database Bridge">Database Bridge</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Endpoint Base URL (HTTPS):
            </label>
            <input
              type="url"
              required
              value={newSourceEndpoint}
              onChange={(e) => setNewSourceEndpoint(e.target.value)}
              placeholder="https://simrs.rsjatiwinangun.co.id/api/v1/fhir"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-on-surface-variant font-sans">
            Kunci API dan token verifikasi SHA-256 akan otomatis diterbitkan setelah formulir disimpan.
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddSourceModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Icon name="check" size={16} />
              <span>Simpan Sumber Data</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL: TERBITKAN KREDENSIAL AKUN */}
      <Modal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        title="Terbitkan Kredensial Akun Teknis"
        size="md"
      >
        <form onSubmit={handleAddAccountSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Nama Lengkap Petugas Teknis:
            </label>
            <input
              type="text"
              required
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="Contoh: Dimas Aditya, S.T"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Instansi Faskes:
              </label>
              <input
                type="text"
                required
                value={newAccountFaskes}
                onChange={(e) => setNewAccountFaskes(e.target.value)}
                placeholder="RS Jatiwinangun"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Hak Akses (Role):
              </label>
              <select
                value={newAccountRole}
                onChange={(e) => setNewAccountRole(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary font-sans"
              >
                <option value="Teknisi SIMRS RS">Teknisi SIMRS RS</option>
                <option value="Operator BDRS">Operator BDRS</option>
                <option value="Super Admin Dinkes">Super Admin Dinkes</option>
                <option value="System Connector Service">System Connector Service</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              Alamat Email Resmi:
            </label>
            <input
              type="email"
              required
              value={newAccountEmail}
              onChange={(e) => setNewAccountEmail(e.target.value)}
              placeholder="it.support@rsjatiwinangun.co.id"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-on-surface outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddAccountModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Icon name="key" size={16} />
              <span>Terbitkan Token Akses</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
