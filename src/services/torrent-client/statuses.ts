// 1. Объект с «унифицированными» статусами
export const STATUS_CODES = {
  STOPPED:          0 as const,
  CHECK_PENDING:    1 as const,
  CHECKING:         2 as const,
  DOWNLOAD_PENDING: 3 as const,
  DOWNLOADING:      4 as const,
  SEED_PENDING:     5 as const,
  SEEDING:          6 as const,
  ISOLATED:         7 as const,
  STALLED:          8 as const,
  ERROR:            9 as const,
  ALLOCATING:      10 as const,
  MOVING:          11 as const,
  UNKNOWN:         12 as const,
  INITIALIZATION:         13 as const,
};
export type TorrentStatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];

// 2. Маппер для Transmission RPC (0…6 → наши коды)
export function mapTransmissionStatus(status: number): TorrentStatusCode {
  switch (status) {
    case 0: return STATUS_CODES.STOPPED;
    case 1: return STATUS_CODES.CHECK_PENDING;
    case 2: return STATUS_CODES.CHECKING;
    case 3: return STATUS_CODES.DOWNLOAD_PENDING;
    case 4: return STATUS_CODES.DOWNLOADING;
    case 5: return STATUS_CODES.SEED_PENDING;
    case 6: return STATUS_CODES.SEEDING;
    default: return STATUS_CODES.UNKNOWN;
  }
}

// 3. Маппер для qBittorrent Web API
export function mapQBState(state: string): TorrentStatusCode {
  switch (state) {
    case 'allocating':                   return STATUS_CODES.ALLOCATING;
    case 'checkingDL':
    case 'checkingUP':
    case 'checkingResumeData':           return STATUS_CODES.CHECKING;
    case 'queuedDL':                     return STATUS_CODES.DOWNLOAD_PENDING;
    case 'queuedUP':                     return STATUS_CODES.SEED_PENDING;
    case 'downloading':
    case 'forcedMetaDL':                 return STATUS_CODES.DOWNLOADING;
    case 'uploading':
    case 'forcedUP':                     return STATUS_CODES.SEEDING;
    case 'pausedDL':
    case 'pausedUP':
    case 'stoppedDL':
    case 'stoppedUP':                    return STATUS_CODES.STOPPED;
    case 'stalledDL':
    case 'stalledUP':                    return STATUS_CODES.STALLED;
    case 'missingFiles':                 return STATUS_CODES.ISOLATED;
    case 'moving':                       return STATUS_CODES.MOVING;
    case 'error':                        return STATUS_CODES.ERROR;
    case 'metaDL':
    case 'forcedDL':                     return STATUS_CODES.INITIALIZATION;
    default:                             return STATUS_CODES.UNKNOWN;
  }
}
