import { type ReactElement, useState } from 'react';
import { useGameStore } from '../../state/gameStore';
import { MessageLog } from './MessageLog';
import { InventoryMenu } from './InventoryMenu';

function getHungerStatus(hunger: number): { label: string; color: string } {
  if (hunger < 100) return { label: 'Starving', color: '#ff004d' };
  if (hunger < 200) return { label: 'Hungry', color: '#ffae00' };
  return { label: 'Normal', color: '#00ff7f' };
}

function getHealthColor(hp: number, maxHp: number): string {
  const ratio = hp / maxHp;
  if (ratio > 0.6) return '#00ff7f';
  if (ratio > 0.3) return '#ffae00';
  return '#ff004d';
}

// Heads-up display component for showing player stats and game information
export const HUD = (): ReactElement => {
  const { player, dungeonLevel, turnCount, messages } = useGameStore();
  const [showInventory, setShowInventory] = useState(false);

  if (!player) return <></>;

  const { stats, inventory } = player;
  const hungerStatus = getHungerStatus(stats.hunger);
  const healthColor = getHealthColor(stats.hp, stats.maxHp);

  return (
    <>
      {showInventory && <InventoryMenu onClose={() => setShowInventory(false)} />}
    <div
      style={{
        background: '#222',
        color: '#fff',
        padding: '16px 24px',
        borderRadius: 8,
        marginBottom: 16,
        fontFamily: 'monospace',
        minWidth: 320,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <strong>Dungeon Level:</strong> {dungeonLevel}
        </div>
        <div>
          <strong>Turn:</strong> {turnCount}
        </div>
      </div>
      
      <div style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 4 }}>
          <strong>HP:</strong> 
          <span style={{ color: healthColor, marginLeft: 4 }}>
            {stats.hp} / {stats.maxHp}
          </span>
        </div>
        <div style={{ marginBottom: 4 }}>
          <strong>Hunger:</strong> {stats.hunger} 
          <span style={{ color: hungerStatus.color, marginLeft: 8 }}>
            ({hungerStatus.label})
          </span>
        </div>
        <div>
          <strong>Level:</strong> {stats.level} &nbsp; | &nbsp;
          <strong>XP:</strong> {stats.xp}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <MessageLog messages={messages} />
        <button
          onClick={() => setShowInventory(true)}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#5d275d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Inventory ({inventory.items.length})
        </button>
      </div>
    </div>
    </>
  );
}; 