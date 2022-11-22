export interface NavigationProps {
  toggleDrawer: () => void;
  open: boolean;
}

export type CalendarMode = 'date' | 'month' | 'year';

export interface CalendarContext {
  state: { selected: Date | null; displayed: Date; mode: CalendarMode };
  changeSelected: (val: Date) => void;
  changeDisplayed: (val: Date, mode: CalendarMode) => void;
}
