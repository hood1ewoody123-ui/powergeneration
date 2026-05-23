'use client'

import type { ReactNode } from 'react'
import {
  Activity,
  AlertTriangle,
  Radio,
  Search,
  Settings,
  Shield,
  Trash2,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Chip,
  Field,
  HudFrame,
  Input,
  Pill,
  Progress,
  Select,
  StatCard,
  StatusRow,
  Textarea,
} from '@/components/ui'

function Section({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-b border-line py-16">
      <div className="mb-10 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest text-green/60">
          {num}
        </span>
        <span className="font-mono text-[11px] tracking-widest text-t-low uppercase">
          {title}
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
      {children}
    </section>
  )
}

export function DsShowcase() {
  const [chipState, setChipState] = useState<'on' | 'idle'>('on')

  return (
    <div className="relative z-[1] mx-auto max-w-[1120px] px-6 pb-24">
      <header className="flex flex-col gap-4 py-16">
        <p className="font-mono text-[10px] tracking-[0.2em] text-green uppercase">
          Phase 1 · CYBERCORE
        </p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
          Design System
        </h1>
        <div className="flex flex-wrap gap-2">
          <Pill>System Online</Pill>
          <Pill dotColor="red">Threat Level Low</Pill>
        </div>
      </header>

      <Section num="01" title="Buttons">
        <div className="flex flex-wrap gap-2">
          <Button variant="fill">
            <Zap className="size-3.5" />
            Execute
          </Button>
          <Button variant="tonal">
            <Radio className="size-3.5" />
            Scan
          </Button>
          <Button variant="outline">
            <Search className="size-3.5" />
            Query
          </Button>
          <Button variant="surface">
            <Settings className="size-3.5" />
            Config
          </Button>
          <Button variant="ghost">Details</Button>
          <Button variant="danger">
            <Trash2 className="size-3.5" />
            Delete
          </Button>
          <Button variant="danger-tonal">
            <AlertTriangle className="size-3.5" />
            Abort
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button loading>Processing</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">
            <Shield className="size-3.5" />
            Large
          </Button>
          <Button size="icon" variant="surface" aria-label="Settings">
            <Settings className="size-3.5" />
          </Button>
        </div>
      </Section>

      <Section num="02" title="Form Controls">
        <div className="grid max-w-md gap-4">
          <Field label="Access code" required>
            <Input placeholder="Enter access code…" iconLeft={<Shield />} />
          </Field>
          <Field label="Node IP" hint="Internal subnet only">
            <Input defaultValue="192.168.0.1" />
          </Field>
          <Field label="Frequency" error="Invalid range">
            <Input defaultValue="BAD_FREQ" error />
          </Field>
          <Field label="Notes">
            <Textarea placeholder="Enter notes…" rows={3} />
          </Field>
          <Field label="Protocol">
            <Select defaultValue="udp">
              <option value="udp">UDP</option>
              <option value="tcp">TCP</option>
            </Select>
          </Field>
        </div>
      </Section>

      <Section num="03" title="Chips & Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Chip
            state={chipState}
            onClick={() => setChipState(chipState === 'on' ? 'idle' : 'on')}
          >
            <Zap />
            All systems
          </Chip>
          <Chip state="on-red">
            <AlertTriangle />
            Alert
          </Chip>
          <Badge variant="green" dot>
            Live
          </Badge>
          <Badge variant="red">Critical</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </Section>

      <Section num="04" title="Cards & Progress">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <Activity />
                Node status
              </CardTitle>
              <Badge variant="green" dot>
                OK
              </Badge>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-t-mid">
                Все подсистемы в норме. Готов к Phase 2 — секции лендинга.
              </p>
              <div className="mt-4 space-y-2">
                <Progress value={72} />
                <Progress value={40} tone="red" size="md" />
                <Progress tone="scan" size="md" />
              </div>
            </CardBody>
          </Card>
          <StatCard
            label="Participants"
            value="128"
            valueTone="green"
            delta={
              <>
                <span className="text-green">+12%</span> vs last shift
              </>
            }
          />
        </div>
      </Section>

      <Section num="05" title="HUD Elements">
        <HudFrame>
          <StatusRow
            items={[
              {
                icon: <Activity />,
                label: 'CPU',
                value: '12%',
                valueTone: 'green',
              },
              {
                icon: <Radio />,
                label: 'SIGNAL',
                value: 'STRONG',
                valueTone: 'green',
              },
              {
                icon: <AlertTriangle />,
                label: 'ERR',
                value: '0',
                valueTone: 'default',
              },
            ]}
          />
        </HudFrame>
      </Section>
    </div>
  )
}
