import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/icons/Icon';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SegmentedControl } from '@/components/SegmentedControl';
import { createReport } from '@/database/reportsRepository';
import { colors, iconSize, radius, spacing, typography } from '@/theme';
import type { ReportKind } from '@/types';

const MAX_LENGTH = 280;

export default function ReportScreen() {
  const params = useLocalSearchParams<{ pointId?: string; pointName?: string }>();
  const db = useSQLiteContext();

  const [kind, setKind] = useState<ReportKind>('problema');
  const [pointName, setPointName] = useState('');
  const [description, setDescription] = useState('');
  const [focused, setFocused] = useState<'local' | 'desc' | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quando o usuário vem da tela de detalhe, o ponto já vem preenchido.
  // (Ajuste de estado durante a renderização, padrão recomendado pelo React no lugar de useEffect.)
  const paramsKey = `${params.pointId ?? ''}|${params.pointName ?? ''}`;
  const [prevParamsKey, setPrevParamsKey] = useState('');
  if (paramsKey !== prevParamsKey) {
    setPrevParamsKey(paramsKey);
    if (params.pointName) {
      setKind('problema');
      setPointName(params.pointName);
    }
  }

  async function handleSave() {
    if (description.trim().length < 5) {
      setErrorMsg('Escreva uma frase curta explicando o aviso.');
      return;
    }
    setErrorMsg(null);
    setSaving(true);
    try {
      await createReport(db, {
        kind,
        pointId: params.pointId ?? null,
        pointName: pointName.trim() || null,
        description,
      });
      setDescription('');
      setPointName('');
      router.setParams({ pointId: undefined, pointName: undefined });
      Alert.alert('Aviso salvo', 'Obrigado! Seu aviso ficou guardado no celular.');
      router.navigate('/historico');
    } catch {
      setErrorMsg('Não foi possível salvar. Tente de novo.');
    } finally {
      setSaving(false);
    }
  }

  const isProblem = kind === 'problema';

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <ScreenHeader title="Fazer um aviso" subtitle="Ajude quem passa pelo mesmo caminho." />

        <SegmentedControl
          accessibilityLabel="Tipo de aviso"
          value={kind}
          onChange={setKind}
          options={[
            { value: 'problema', label: 'Problema' },
            { value: 'sugestao', label: 'Ponto novo' },
          ]}
        />

        <Card style={styles.form}>
          <View style={styles.field}>
            <AppText variant="callout" nativeID="label-local">
              {isProblem ? 'Qual ponto?' : 'Onde fica?'}
            </AppText>
            <View style={[styles.inputBox, focused === 'local' && styles.inputFocused]}>
              <Icon name="map-point" size={iconSize.md} color={colors.textMuted} />
              <TextInput
                value={pointName}
                onChangeText={setPointName}
                placeholder={isProblem ? 'Ex.: Bebedouro da praça' : 'Ex.: Praça da Rua Augusta, 100'}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                onFocus={() => setFocused('local')}
                onBlur={() => setFocused(null)}
                accessibilityLabel={isProblem ? 'Nome do ponto' : 'Endereço do ponto novo'}
                accessibilityLabelledBy="label-local"
              />
            </View>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <AppText variant="callout" nativeID="label-desc">
                {isProblem ? 'O que aconteceu?' : 'Por que é um bom ponto?'}
              </AppText>
              <AppText variant="caption" color={colors.textMuted}>
                {description.length}/{MAX_LENGTH}
              </AppText>
            </View>
            <TextInput
              value={description}
              onChangeText={setDescription}
              maxLength={MAX_LENGTH}
              placeholder={isProblem ? 'Ex.: O bebedouro está sem água.' : 'Ex.: Tem árvores e bancos na sombra.'}
              placeholderTextColor={colors.textMuted}
              style={[styles.inputBox, styles.textarea, focused === 'desc' && styles.inputFocused]}
              multiline
              textAlignVertical="top"
              onFocus={() => setFocused('desc')}
              onBlur={() => setFocused(null)}
              accessibilityLabel="Descrição do aviso"
              accessibilityLabelledBy="label-desc"
            />
          </View>
        </Card>

        {errorMsg && (
          <View style={styles.error} accessibilityRole="alert" accessibilityLiveRegion="polite">
            <Icon name="danger-circle" variant="bold" size={iconSize.md} color={colors.danger} />
            <AppText variant="subhead" color={colors.danger} style={styles.flex}>
              {errorMsg}
            </AppText>
          </View>
        )}

        <View style={styles.footer}>
          <Button label="Salvar aviso" icon="check-circle" onPress={handleSave} loading={saving} />
          <View style={styles.privacy}>
            <Icon name="shield-check" size={iconSize.sm} color={colors.textMuted} />
            <AppText variant="caption" color={colors.textMuted}>
              Fica salvo só no seu celular. Sem cadastro.
            </AppText>
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  form: { gap: spacing.xl, padding: spacing.xl },
  field: { gap: spacing.sm },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    ...typography.body,
    color: colors.text,
  },
  inputFocused: { borderColor: colors.accent, backgroundColor: colors.surface },
  input: { flex: 1, ...typography.body, color: colors.text, paddingVertical: spacing.sm },
  textarea: { minHeight: 132, paddingTop: spacing.md, alignItems: 'flex-start' },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.dangerSoft,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  footer: { gap: spacing.md },
  privacy: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
});
